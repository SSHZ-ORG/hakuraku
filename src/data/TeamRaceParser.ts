import {deserializeFromBase64} from "./RaceDataParser";
import msgpack from "@ygoe/msgpack";
import _ from "lodash";
import UMDatabaseWrapper from "./UMDatabaseWrapper";
import UMDatabaseUtils from "./UMDatabaseUtils";
import {fromRaceHorseData, TrainedCharaData} from "./TrainedCharaData";
import {getCharaActivatedSkillIds} from "./RaceDataUtils";

export type TeamRaceGroupData = {
    timestamp: number,

    charaRaceDatas: CharaRaceData[],
}

export type CharaRaceData = {
    trainedChara: TrainedCharaData,
    isAce: boolean,

    distanceType: keyof typeof UMDatabaseUtils.teamRaceDistanceLabels,
    runningStyle: keyof typeof UMDatabaseUtils.runningStyleLabels,

    rawScore: number,
    bonusScores: Record<number, number>,
    rawScoreDevRatio: number,

    lastHp: number,
    startDelayTime: number,
    lastSpurtDistanceRatio: number,
    zeroHpFrameCount: number,
    nonZeroTemptationFrameCount: number,
    finishOrder: number, // 0-indexed

    activatedSkillIds: Set<number>,
};

export function parse(file: File): Promise<TeamRaceGroupData | undefined> {
    if (file.name.endsWith("Q.msgpack"))
        return Promise.resolve(undefined);

    return file.arrayBuffer().then(content => {
        let deserialized: any;
        try {
            deserialized = msgpack.deserialize(content);
        } catch (e) {
            console.log("Failed to parse file!", file, e);
            return undefined;
        }

        const data = deserialized['data'];
        if (!(data &&
            data['race_start_params_array'] &&
            data['race_result_array'] &&
            data['race_start_params_array'].length === data['race_result_array'].length)) {
            return undefined;
        }

        const outputDataList: CharaRaceData[] = [];

        const viewerId = deserialized['data_headers']['viewer_id'];
        data['race_start_params_array'].forEach((raceStartParams: any, idx: number) => {
            const raceInstance = UMDatabaseWrapper.raceInstances[raceStartParams['race_instance_id']];

            const raceHorseDatas = raceStartParams['race_horse_data_array'];
            const raceResult = data['race_result_array'][idx];
            const raceSimulateData = deserializeFromBase64(raceResult['race_scenario']);

            for (let raceHorseData of raceHorseDatas) {
                if (raceHorseData['viewer_id'] !== viewerId)
                    continue;

                const frameOrder = raceHorseData['frame_order'] - 1;

                const charaResult = raceResult['chara_result_array'][frameOrder];
                const raceHorseResult = raceSimulateData.horseResult[frameOrder];

                let zeroHpFrameCount = 0;
                let nonZeroTemptationFrameCount = 0;
                for (let frame of raceSimulateData.frame) {
                    const horseFrame = frame.horseFrame[frameOrder];
                    if (horseFrame.hp! <= 0 && frame.time! < raceHorseResult.finishTimeRaw!) {
                        zeroHpFrameCount += 1;
                    }
                    if (horseFrame.temptationMode! > 0) {
                        nonZeroTemptationFrameCount += 1;
                    }
                }

                const bonusScores: Record<number, number> = _.mapValues(
                    _.groupBy(charaResult['score_array'].map((score: any) => score['bonus_array']).flat(),
                        bonus => bonus['score_bonus_id']),
                    bonuses => _.sumBy(bonuses, b => b['bonus_score']));

                const activatedSkillIds = getCharaActivatedSkillIds(raceSimulateData, frameOrder);

                outputDataList.push({
                    trainedChara: fromRaceHorseData(raceHorseData),
                    isAce: raceHorseData['team_member_id'] === 1,

                    distanceType: raceResult['distance_type'],
                    runningStyle: raceHorseData['running_style'],

                    rawScore: _.sumBy(charaResult['score_array'], (i: any) => i['score']) - _.sum(_.values(bonusScores)),
                    bonusScores: bonusScores,
                    rawScoreDevRatio: 0, // dummy value

                    lastHp: _.last(raceSimulateData.frame)!.horseFrame[frameOrder].hp!,
                    startDelayTime: raceHorseResult.startDelayTime!,
                    lastSpurtDistanceRatio: raceHorseResult.lastSpurtStartDistance! <= 0 ? 0 : 1 - (raceHorseResult.lastSpurtStartDistance! / raceInstance.distance!),
                    zeroHpFrameCount: zeroHpFrameCount,
                    nonZeroTemptationFrameCount: nonZeroTemptationFrameCount,
                    finishOrder: raceHorseResult.finishOrder!,

                    activatedSkillIds: activatedSkillIds,
                });
            }
        });

        const avgRawScore = _.meanBy(outputDataList, i => i.rawScore);
        outputDataList.forEach(i => i.rawScoreDevRatio = (i.rawScore - avgRawScore) / avgRawScore);

        return {
            timestamp: deserialized['data_headers']['servertime'],
            charaRaceDatas: outputDataList,
        };
    });
}

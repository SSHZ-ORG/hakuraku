import {deserializeFromBase64} from "./RaceDataParser";
// @ts-ignore
import msgpack from "@ygoe/msgpack";
import _ from "lodash";
import UMDatabaseWrapper from "./UMDatabaseWrapper";
import UMDatabaseUtils from "./UMDatabaseUtils";
import {fromRaceHorseData, TrainedCharaData} from "./TrainedCharaData";

export type CharaRaceData = {
    trainedChara: TrainedCharaData,

    distanceType: keyof typeof UMDatabaseUtils.teamRaceDistanceLabels,
    runningStyle: keyof typeof UMDatabaseUtils.runningStyleLabels,

    rawScore: number,
    bonusScores: Record<number, number>,

    lastHp: number,
    startDelayTime: number,
    lastSpurtDistanceRatio: number,
    zeroHpFrameCount: number,
    nonZeroTemptationFrameCount: number,
    finishOrder: number, // 0-indexed
};

export function parse(file: File): Promise<CharaRaceData[]> {
    if (file.name.endsWith("Q.msgpack"))
        return Promise.resolve([]);

    return file.arrayBuffer().then(content => {
        let deserialized: any;
        try {
            deserialized = msgpack.deserialize(content);
        } catch (e) {
            console.log("Failed to parse file!", file, e);
            return [];
        }

        const data = deserialized['data'];
        if (!(data &&
            data['race_start_params_array'] &&
            data['race_result_array'] &&
            data['race_start_params_array'].length === data['race_result_array'].length)) {
            return [];
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
                const raceHorseResult = raceSimulateData.getHorseResultList()[frameOrder];

                let zeroHpFrameCount = 0;
                let nonZeroTemptationFrameCount = 0;
                for (let frame of raceSimulateData.getFrameList()) {
                    const horseFrame = frame.getHorseFrameList()[frameOrder];
                    if (horseFrame.getHp()! <= 0 && frame.getTime()! < raceHorseResult.getFinishTimeRaw()!) {
                        zeroHpFrameCount += 1;
                    }
                    if (horseFrame.getTemptationMode()! > 0) {
                        nonZeroTemptationFrameCount += 1;
                    }
                }

                const bonusScores: Record<number, number> = _.mapValues(
                    _.groupBy(charaResult['score_array'].map((score: any) => score['bonus_array']).flat(),
                        bonus => bonus['score_bonus_id']),
                    bonuses => _.sumBy(bonuses, b => b['bonus_score']));

                outputDataList.push({
                    trainedChara: fromRaceHorseData(raceHorseData),

                    distanceType: raceResult['distance_type'],
                    runningStyle: raceHorseData['running_style'],

                    rawScore: _.sumBy(charaResult['score_array'], (i: any) => i['score']) - _.sum(_.values(bonusScores)),
                    bonusScores: bonusScores,

                    lastHp: _.last(raceSimulateData.getFrameList())!.getHorseFrameList()[frameOrder].getHp()!,
                    startDelayTime: raceHorseResult.getStartDelayTime()!,
                    lastSpurtDistanceRatio: raceHorseResult.getLastSpurtStartDistance()! <= 0 ? 0 : 1 - (raceHorseResult.getLastSpurtStartDistance()! / raceInstance.getDistance()!),
                    zeroHpFrameCount: zeroHpFrameCount,
                    nonZeroTemptationFrameCount: nonZeroTemptationFrameCount,
                    finishOrder: raceHorseResult.getFinishOrder()!,
                });
            }
        });
        return outputDataList;
    });
}

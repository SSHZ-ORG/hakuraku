import {deserializeFromBase64} from "./RaceDataParser";
// @ts-ignore
import msgpack from "@ygoe/msgpack";

export type CharaRaceData = {
    viewerId: number,
    trainedCharaId: number,
    distanceType: number,
    runningStyle: number,

    charaId: number,

    score: number,
    lastHp: number,
    startDelayTime: number,
    lastSpurtStartDistance: number,
};

export function parse(file: File): Promise<CharaRaceData[]> {
    if (file.name.endsWith("Q.msgpack"))
        return Promise.resolve([]);

    return file.arrayBuffer().then(content => {
        const deserialized = msgpack.deserialize(content);

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
            const raceHorseDatas = raceStartParams['race_horse_data_array'];
            const raceResult = data['race_result_array'][idx];
            const raceSimulateData = deserializeFromBase64(raceResult['race_scenario']);

            for (let raceHorseData of raceHorseDatas) {
                if (raceHorseData['viewer_id'] !== viewerId)
                    continue;

                const frameOrder = raceHorseData['frame_order'] - 1;

                const charaResult = raceResult['chara_result_array'][frameOrder];
                const raceHorseResult = raceSimulateData.getHorseResultList()[frameOrder];

                outputDataList.push({
                    viewerId: viewerId,
                    trainedCharaId: raceHorseData['trained_chara_id'],
                    charaId: raceHorseData['chara_id'],
                    distanceType: raceResult['distance_type'],
                    runningStyle: raceHorseData['running_style'],

                    score: charaResult['score_array'].map((i: any) => i['score']).reduce((a: number, b: number) => a + b, 0),
                    lastHp: raceSimulateData.getFrameList()[raceSimulateData.getFrameCount()! - 1].getHorseFrameList()[frameOrder].getHp()!,
                    startDelayTime: raceHorseResult.getStartDelayTime()!,

                    lastSpurtStartDistance: raceHorseResult.getLastSpurtStartDistance()!,
                });
            }
        });
        return outputDataList;
    });
}

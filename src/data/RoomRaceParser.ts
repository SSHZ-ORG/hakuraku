import msgpack from "@ygoe/msgpack";
import _ from "lodash";
import {RaceInstance} from "./data_pb";
import {deserializeFromBase64} from "./RaceDataParser";
import {filterCharaSkills} from "./RaceDataUtils";
import {fromRaceHorseData, TrainedCharaData} from "./TrainedCharaData";
import UMDatabaseWrapper from "./UMDatabaseWrapper";

export type RoomRaceData = {
    viewerId: number,
    raceInstance: RaceInstance,
    charaDatas: RoomRaceCharaData[],
}

export type RoomRaceCharaData = {
    trainedChara: TrainedCharaData,

    finishTime: number,
    finishTimeRaw: number,
    finishOrder: number, // 0-indexed

    skillActivationDistances: { skillId: number, activationDistance: number }[],
}

export function parse(file: File): Promise<RoomRaceData | undefined> {
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
        if (!data) {
            return undefined;
        }

        let raceScenario: string, raceHorseDataArray: any[], raceInstanceId: number;
        if (data['race_result'] && data['race_scenario'] && data['race_horse_data_array']) {
            // Room match
            raceScenario = data['race_scenario'];
            raceHorseDataArray = data['race_horse_data_array'];
            raceInstanceId = data['race_result']['race_instance_id'];
        } else if (data['race_result_info']) {
            // Practice
            raceScenario = data['race_result_info']['race_scenario'];
            raceHorseDataArray = data['race_result_info']['race_horse_data_array'];
            raceInstanceId = data['race_result_info']['race_instance_id'];
        } else if (data['room_info'] && data['room_info']['race_scenario'] && data['race_horse_data_array']) {
            // Champions Meeting
            raceScenario = data['room_info']['race_scenario'];
            raceHorseDataArray = data['race_horse_data_array'];
            raceInstanceId = data['room_info']['race_instance_id'];
        } else {
            return undefined;
        }

        const outputDataList: RoomRaceCharaData[] = [];
        const raceSimulateData = deserializeFromBase64(raceScenario);
        const frameTimes = raceSimulateData.getFrameList().map(frame => frame.getTime()!);

        for (let raceHorseData of raceHorseDataArray) {
            if (!raceHorseData['viewer_id']) {
                continue;
            }

            const frameOrder = raceHorseData['frame_order'] - 1;

            const raceHorseResult = raceSimulateData.getHorseResultList()[frameOrder];

            const skillEvents = filterCharaSkills(raceSimulateData, frameOrder).map(eventData => {
                const frameIndex = _.sortedIndex(frameTimes, eventData.getFrameTime()!);
                let distance = 0;
                if (frameIndex > 0) {
                    const distance1 = raceSimulateData.getFrameList()[frameIndex - 1].getHorseFrameList()[frameOrder].getDistance()!;
                    const distance2 = raceSimulateData.getFrameList()[frameIndex].getHorseFrameList()[frameOrder].getDistance()!;
                    distance = distance1 + (distance2 - distance1) / (frameTimes[frameIndex] - frameTimes[frameIndex - 1]) * (eventData.getFrameTime()! - frameTimes[frameIndex - 1]);
                }
                return {
                    skillId: eventData.getParamList()[1],
                    activationDistance: distance,
                };
            });

            outputDataList.push({
                trainedChara: fromRaceHorseData(raceHorseData),

                finishTime: raceHorseResult.getFinishTime()!,
                finishTimeRaw: raceHorseResult.getFinishTimeRaw()!,
                finishOrder: raceHorseResult.getFinishOrder()!,

                skillActivationDistances: skillEvents,
            });
        }

        return {
            viewerId: deserialized['data_headers']['viewer_id'],
            raceInstance: UMDatabaseWrapper.raceInstances[raceInstanceId],
            charaDatas: outputDataList,
        }
    });
}

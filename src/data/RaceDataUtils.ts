import {RaceSimulateData, RaceSimulateEventData} from "./race_data_pb";

// frameOrder should be 0-indexed.
export function filterCharaSkills(raceSimulateData: RaceSimulateData, frameOrder: number): RaceSimulateEventData[] {
    return raceSimulateData.getEventList().map(e => e.getEvent()!)
        .filter(event => event.getType() === RaceSimulateEventData.SimulateEventType.SKILL && event.getParamList()[0] === frameOrder);
}

// frameOrder should be 0-indexed.
export function getCharaActivatedSkillIds(raceSimulateData: RaceSimulateData, frameOrder: number): Set<number> {
    return new Set(filterCharaSkills(raceSimulateData, frameOrder).map(event => event.getParamList()[1]));
}

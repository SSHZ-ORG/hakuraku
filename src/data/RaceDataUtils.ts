import {RaceSimulateData, RaceSimulateEventData} from "./race_data_pb";

// frameOrder should be 0-indexed.
function filterRaceEvents(raceSimulateData: RaceSimulateData, frameOrder: number, eventType: RaceSimulateEventData.SimulateEventTypeMap[keyof RaceSimulateEventData.SimulateEventTypeMap]): RaceSimulateEventData[] {
    return raceSimulateData.getEventList().map(e => e.getEvent()!)
        .filter(event => event.getType() === eventType && event.getParamList()[0] === frameOrder);
}

// frameOrder should be 0-indexed.
export function filterCharaSkills(raceSimulateData: RaceSimulateData, frameOrder: number): RaceSimulateEventData[] {
    return filterRaceEvents(raceSimulateData, frameOrder, RaceSimulateEventData.SimulateEventType.SKILL);
}

// frameOrder should be 0-indexed.
export function getCharaActivatedSkillIds(raceSimulateData: RaceSimulateData, frameOrder: number): Set<number> {
    return new Set(filterCharaSkills(raceSimulateData, frameOrder).map(event => event.getParamList()[1]));
}

// frameOrder should be 0-indexed. This excludes skills casted by self.
export function filterCharaTargetedSkills(raceSimulateData: RaceSimulateData, frameOrder: number): RaceSimulateEventData[] {
    const mask = 1 << frameOrder;
    return raceSimulateData.getEventList().map(e => e.getEvent()!)
        .filter(event => event.getType() === RaceSimulateEventData.SimulateEventType.SKILL &&
            event.getParamList()[0] !== frameOrder &&
            event.getParamCount()! >= 5 && (event.getParamList()[4] & mask));
}

// 位置取り争い, frameOrder should be 0-indexed.
export function filterCharaCompeteTop(raceSimulateData: RaceSimulateData, frameOrder: number): RaceSimulateEventData[] {
    return filterRaceEvents(raceSimulateData, frameOrder, RaceSimulateEventData.SimulateEventType.COMPETE_TOP);
}

// 追い比べ, frameOrder should be 0-indexed.
export function filterCharaCompeteFight(raceSimulateData: RaceSimulateData, frameOrder: number): RaceSimulateEventData[] {
    return filterRaceEvents(raceSimulateData, frameOrder, RaceSimulateEventData.SimulateEventType.COMPETE_FIGHT);
}

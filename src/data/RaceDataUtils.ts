import {RaceSimulateData, RaceSimulateEventData, RaceSimulateEventData_SimulateEventType} from "./race_data_pb";

// frameOrder should be 0-indexed.
export function filterRaceEvents(raceSimulateData: RaceSimulateData, frameOrder: number, eventType: RaceSimulateEventData_SimulateEventType): RaceSimulateEventData[] {
    return raceSimulateData.event.map(e => e.event!)
        .filter(event => event.type === eventType && event.param[0] === frameOrder);
}

// frameOrder should be 0-indexed.
export function filterCharaSkills(raceSimulateData: RaceSimulateData, frameOrder: number): RaceSimulateEventData[] {
    return filterRaceEvents(raceSimulateData, frameOrder, RaceSimulateEventData_SimulateEventType.SKILL);
}

// frameOrder should be 0-indexed.
export function getCharaActivatedSkillIds(raceSimulateData: RaceSimulateData, frameOrder: number): Set<number> {
    return new Set(filterCharaSkills(raceSimulateData, frameOrder).map(event => event.param[1]));
}

// frameOrder should be 0-indexed. This excludes skills casted by self.
export function filterCharaTargetedSkills(raceSimulateData: RaceSimulateData, frameOrder: number): RaceSimulateEventData[] {
    const mask = 1 << frameOrder;
    return raceSimulateData.event.map(e => e.event!)
        .filter(event => event.type === RaceSimulateEventData_SimulateEventType.SKILL &&
            event.param[0] !== frameOrder &&
            event.paramCount! >= 5 && (event.param[4] & mask));
}

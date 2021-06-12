export type CharaSkill = {
    skillId: number,
    level: number,
}

export type TrainedCharaData = {
    viewerId: number,
    viewerName: string,

    trainedCharaId: number,
    charaId: number,

    skills: CharaSkill[],

    speed: number,
    stamina: number,
    pow: number,
    guts: number,
    wiz: number,

    rawData: any,
};

export function fromRaceHorseData(raceHorseData: any): TrainedCharaData {
    return {
        viewerId: raceHorseData['viewer_id'],
        viewerName: raceHorseData['trainer_name'],

        trainedCharaId: raceHorseData['trained_chara_id'],
        charaId: raceHorseData['chara_id'],

        skills: raceHorseData['skill_array'].map((skill: any) => ({
            skillId: skill['skill_id'],
            level: skill['level']
        } as CharaSkill)),

        speed: raceHorseData['speed'],
        stamina: raceHorseData['stamina'],
        pow: raceHorseData['pow'],
        guts: raceHorseData['guts'],
        wiz: raceHorseData['wiz'],

        rawData: raceHorseData,
    };
}

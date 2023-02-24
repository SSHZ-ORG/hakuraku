import _ from "lodash";
import UMDatabaseWrapper from "./UMDatabaseWrapper";

export type CharaSkill = {
    skillId: number,
    level: number,
}

export type TrainedCharaData = {
    viewerId: number,
    viewerName: string,

    trainedCharaId: number,
    charaId: number,
    cardId: number,

    skills: CharaSkill[],

    speed: number,
    stamina: number,
    pow: number,
    guts: number,
    wiz: number,

    properDistances: Record<number, number>,
    properRunningStyles: Record<number, number>,
    properGroundTurf: number,
    properGroundDirt: number,

    rankScore: number,

    rawData: any,
};

type StatusPoints = {
    speed: number,
    stamina: number,
    pow: number,
    guts: number,
    wiz: number,
}

function calcRankScore(raceHorseData: any, statusPoints: StatusPoints, charaSkills: CharaSkill[], properRunningStyles: Record<number, number>, properDistances: Record<number, number>): number {
    if (raceHorseData['rank_score']) {
        return raceHorseData['rank_score'];
    }

    let rankScore = _.sumBy([statusPoints.speed, statusPoints.stamina, statusPoints.pow, statusPoints.guts, statusPoints.wiz],
        value => statusPointToRankPoint[value]);
    for (let charaSkill of charaSkills) {
        const skillId = charaSkill.skillId;
        const skill = UMDatabaseWrapper.skills[skillId];
        if (skill === undefined) {
            continue;
        }

        if (skillId < 200000) {
            // 固有スキル
            rankScore += skill.gradeValue! / 2 * charaSkill.level;
        } else {
            const tagIds = new Set(skill.tagId);
            let multiplier = 1;
            [1, 2, 3, 4].forEach(runningStyleTag => {
                if (tagIds.has('10' + runningStyleTag.toString())) {
                    multiplier *= properSkillMultiplier[properRunningStyles[runningStyleTag]];
                }
            });
            [1, 2, 3, 4].forEach(distanceTag => {
                if (tagIds.has('20' + distanceTag.toString())) {
                    multiplier *= properSkillMultiplier[properDistances[distanceTag]];
                }
            });
            rankScore += Math.round(skill.gradeValue! * multiplier);
        }
    }

    return rankScore;
}

export function fromRaceHorseData(raceHorseData: any): TrainedCharaData {
    const charaSkills: CharaSkill[] = raceHorseData['skill_array'].map((skill: any) => ({
        skillId: skill['skill_id'],
        level: skill['level'],
    } as CharaSkill));

    const statusPoints = {
        speed: raceHorseData['speed'],
        stamina: raceHorseData['stamina'],
        pow: raceHorseData['pow'] || raceHorseData['power'], // 'power' in trained_chara
        guts: raceHorseData['guts'],
        wiz: raceHorseData['wiz'],
    };

    const properDistances: Record<number, number> = {
        1: raceHorseData['proper_distance_short'],
        2: raceHorseData['proper_distance_mile'],
        3: raceHorseData['proper_distance_middle'],
        4: raceHorseData['proper_distance_long'],
    };
    const properRunningStyles: Record<number, number> = {
        1: raceHorseData['proper_running_style_nige'],
        2: raceHorseData['proper_running_style_senko'],
        3: raceHorseData['proper_running_style_sashi'],
        4: raceHorseData['proper_running_style_oikomi'],
    };

    return {
        viewerId: raceHorseData['viewer_id'],
        viewerName: raceHorseData['trainer_name'],

        trainedCharaId: raceHorseData['trained_chara_id'],
        charaId: raceHorseData['chara_id'],
        cardId: raceHorseData['card_id'],

        skills: charaSkills,

        ...statusPoints,

        properDistances: properDistances,
        properRunningStyles: properRunningStyles,
        properGroundTurf: raceHorseData['proper_ground_turf'],
        properGroundDirt: raceHorseData['proper_ground_dirt'],

        rankScore: calcRankScore(raceHorseData, statusPoints, charaSkills, properRunningStyles, properDistances),

        rawData: raceHorseData,
    };
}

const statusPointToRankPoint: Record<number, number> = (() => {
    const result: Record<number, number> = {};

    const set369 = new Set([3, 6, 9]);
    const set0257 = new Set([0, 2, 5, 7]);
    const set2479 = new Set([2, 4, 7, 9]);
    const set49 = new Set([4, 9]);

    const max = 1200;
    let currentPoint = 0;

    for (let i = 0; i <= max; i++) {
        const lastDigit = i % 10;

        let additionalPoint = 0;
        if (i < 50) {
            additionalPoint = (i % 2 === 0) ? 0 : 1;
        } else if (i < 100) {
            additionalPoint = (i % 5 === 0) ? 0 : 1;
        } else if (i < 150) {
            additionalPoint = 1;
        } else if (i < 200) {
            additionalPoint = (set369.has(lastDigit)) ? 2 : 1;
        } else if (i < 250) {
            additionalPoint = (set0257.has(lastDigit)) ? 1 : 2;
        } else if (i < 300) {
            additionalPoint = (i % 5 === 0) ? 1 : 2;
        } else if (i < 350) {
            additionalPoint = (lastDigit === 9) ? 3 : 2;
        } else if (i < 400) {
            additionalPoint = (set2479.has(lastDigit)) ? 3 : 2;
        } else if (i < 450) {
            additionalPoint = (set0257.has(lastDigit)) ? 2 : 3;
        } else if (i < 500) {
            additionalPoint = (i % 5 === 0) ? 2 : 3;
        } else if (i < 550) {
            additionalPoint = (lastDigit === 0) ? 2 : 3;
        } else if (i < 600) {
            additionalPoint = 3;
        } else if (i < 650) {
            additionalPoint = (lastDigit === 9) ? 4 : 3;
        } else if (i < 700) {
            additionalPoint = (set369.has(lastDigit)) ? 4 : 3;
        } else if (i < 750) {
            additionalPoint = (set2479.has(lastDigit)) ? 4 : 3;
        } else if (i < 800) {
            additionalPoint = (i % 2 === 0) ? 3 : 4;
        } else if (i < 850) {
            additionalPoint = (lastDigit === 0) ? 3 : 4;
        } else if (i < 900) {
            additionalPoint = (lastDigit === 9) ? 5 : 4;
        } else if (i < 950) {
            additionalPoint = (set49.has(lastDigit)) ? 5 : 4;
        } else if (i < 1000) {
            additionalPoint = (set369.has(lastDigit)) ? 5 : 4;
        } else if (i < 1050) {
            additionalPoint = (set49.has(lastDigit)) ? 6 : 5;
        } else if (i < 1100) {
            additionalPoint = (i % 2 === 0) ? 5 : 6;
        } else if (i < 1150) {
            additionalPoint = (set0257.has(lastDigit)) ? 6 : 7;
        } else if (i < 1200) {
            additionalPoint = (i % 5 === 0) ? 6 : 7;
        } else {
            additionalPoint = 6;
        }
        currentPoint += additionalPoint;

        result[i] = currentPoint;
    }

    return result;
})();

const properSkillMultiplier: Record<number, number> = {1: 0.7, 2: 0.8, 3: 0.8, 4: 0.8, 5: 0.9, 6: 0.9, 7: 1.1, 8: 1.1};

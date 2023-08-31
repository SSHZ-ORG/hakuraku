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

function calcRankScore(raceHorseData: any, statusPoints: StatusPoints, charaSkills: CharaSkill[], properRunningStyles: Record<number, number>, properDistances: Record<number, number>, properGrounds: Record<number, number>): number {
    if (raceHorseData['rank_score']) {
        return raceHorseData['rank_score'];
    }

    let rankScore = _.sumBy([statusPoints.speed, statusPoints.stamina, statusPoints.pow, statusPoints.guts, statusPoints.wiz],
        value => statusPoint(value));
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
            let runningStyleMultiplier = 0;
            [1, 2, 3, 4].forEach(runningStyleTag => {
                if (tagIds.has('10' + runningStyleTag.toString())) {
                    runningStyleMultiplier = _.max([runningStyleMultiplier, properSkillMultiplier[properRunningStyles[runningStyleTag]]])!;
                }
            });
            if (runningStyleMultiplier === 0) runningStyleMultiplier = 1;
            let distanceMultiplier = 0;
            [1, 2, 3, 4].forEach(distanceTag => {
                if (tagIds.has('20' + distanceTag.toString())) {
                    distanceMultiplier = _.max([distanceMultiplier, properSkillMultiplier[properDistances[distanceTag]]])!;
                }
            });
            if (distanceMultiplier === 0) distanceMultiplier = 1;
            let groundMultiplier = 0;
            [1, 2].forEach(groundTag => {
                if (tagIds.has('50' + groundTag.toString())) {
                    groundMultiplier = _.max([groundMultiplier, properSkillMultiplier[properGrounds[groundTag]]])!;
                }
            });
            if (groundMultiplier === 0) groundMultiplier = 1;
            rankScore += Math.round(skill.gradeValue! * runningStyleMultiplier * distanceMultiplier * groundMultiplier);
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

    const turf = raceHorseData['proper_ground_turf'];
    const dirt = raceHorseData['proper_ground_dirt'];

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
        properGroundTurf: turf,
        properGroundDirt: dirt,

        rankScore: calcRankScore(
            raceHorseData, statusPoints, charaSkills, properRunningStyles, properDistances, {1: turf, 2: dirt}),

        rawData: raceHorseData,
    };
}

function statusPoint(point: number): number {
    if (point <= 1200) {
        return statusPointToRankPointBelow1200[point];
    }
    return statusPointToRankPointOver1200(point);
}

const statusPointToRankPointBelow1200: Record<number, number> = (() => {
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

const over1200ObservationPoints = [
    {x: 1200, y: 3841}, {x: 1202, y: 3857}, {x: 1203, y: 3865}, {x: 1212, y: 3936}, {x: 1220, y: 4001},
    {x: 1236, y: 4132}, {x: 1264, y: 4368}, {x: 1266, y: 4386}, {x: 1270, y: 4420}, {x: 1271, y: 4429},
    {x: 1285, y: 4553}, {x: 1300, y: 4688}, {x: 1317, y: 4845}, {x: 1324, y: 4910}, {x: 1345, y: 5112},
    {x: 1352, y: 5180}, {x: 1358, y: 5239}, {x: 1364, y: 5298}, {x: 1368, y: 5338}, {x: 1370, y: 5359},
    {x: 1371, y: 5369}, {x: 1372, y: 5379}, {x: 1384, y: 5500}, {x: 1389, y: 5551}, {x: 1397, y: 5634},
    {x: 1399, y: 5654}, {x: 1407, y: 5798}, {x: 1413, y: 5802}, {x: 1421, y: 5887}, {x: 1424, y: 5919},
    {x: 1429, y: 5972}, {x: 1434, y: 6027}, {x: 1443, y: 6125}, {x: 1445, y: 6147}, {x: 1447, y: 6169},
    {x: 1456, y: 6269}, {x: 1459, y: 6302}, {x: 1467, y: 6393}, {x: 1473, y: 6461}, {x: 1475, y: 6484},
    {x: 1477, y: 6507}, {x: 1483, y: 6575}, {x: 1489, y: 6644}, {x: 1546, y: 7328}, {x: 1555, y: 7439},
    {x: 1557, y: 7464}, {x: 1558, y: 7476}, {x: 1560, y: 7501}, {x: 1564, y: 7551}, {x: 1572, y: 7653},
    {x: 1585, y: 7818}, {x: 1588, y: 7857}, {x: 1589, y: 7869}, {x: 1594, y: 7934}, {x: 1600, y: 8013},
    {x: 1604, y: 8065}, {x: 1605, y: 8078}, {x: 1665, y: 8889}, {x: 1684, y: 9155}];

function statusPointToRankPointOver1200(e: number): number {
    let prevX = 0, prevY = 0;
    for (let point of over1200ObservationPoints) {
        if (point.x > e) {
            const slope = (point.y - prevY) / (point.x - prevX);
            return prevY + Math.round(slope * (e - prevX));
        }
        prevX = point.x;
        prevY = point.y;
    }
    return 0;
}

const properSkillMultiplier: Record<number, number> = {1: 0.7, 2: 0.8, 3: 0.8, 4: 0.8, 5: 0.9, 6: 0.9, 7: 1.1, 8: 1.1};

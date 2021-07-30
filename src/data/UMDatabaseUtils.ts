import _ from 'lodash';
import {Chara, SpecialCaseRace, SuccessionRelation} from './data_pb';


class UMDatabaseUtils {
    static calculateTotalPoint(relations: SuccessionRelation[]) {
        return _.sumBy(relations, r => r.getRelationPoint()!);
    }

    static getRelationRank(point: number) {
        if (point >= 151) {
            return '◎';
        }
        if (point >= 51) {
            return '○';
        }
        return '△';
    }

    static racePermissionEnumNames: Record<SpecialCaseRace.RacePermissionMap[keyof SpecialCaseRace.RacePermissionMap], string> =
        Object.keys(SpecialCaseRace.RacePermission).reduce((ret, key) => {
            // @ts-ignore
            ret[SpecialCaseRace.RacePermission[key]] = key;
            return ret;
        }, {} as Record<SpecialCaseRace.RacePermissionMap[keyof SpecialCaseRace.RacePermissionMap], string>);

    static charaNameWithIdAndCast(chara: Chara) {
        return `${chara.getId()} - ${UMDatabaseUtils.charaNameWithCast(chara)}`;
    }

    static charaNameWithCast(chara: Chara) {
        return `${chara.getName()} (${chara.getCastName()})`;
    }

    static getPopularityMark(n: number) {
        const mark = n === 1 ? '◎' : n === 2 ? '○' : n === 3 ? '▲' : n === 4 || n === 5 ? '△' : '';
        return `${n}${mark}`;
    }

    static teamRaceDistanceLabels: Record<number, string> = {1: '短距離', 2: 'マイル', 3: '中距離', 4: '長距離', 5: 'ダート'};

    static distanceLabels: Record<number, string> = {1: '短距離', 2: 'マイル', 3: '中距離', 4: '長距離'};
    static runningStyleLabels: Record<number, string> = {1: '逃げ', 2: '先行', 3: '差し', 4: '追込'};
    static motivationLabels: Record<number, string> = {1: '絶不調', 2: '不調', 3: '普通', 4: '好調', 5: '絶好調'};

    static seasonLabels: Record<number, string> = {1: '春', 2: '夏', 3: '秋', 4: '冬', 5: '春'};
    static groundConditionLabels: Record<number, string> = {1: '良', 2: '稍重', 3: '重', 4: '不良'};
    static weatherLabels: Record<number, string> = {1: '晴', 2: '曇', 3: '雨', 4: '雪'};

    static charaProperLabels: Record<number, string> = {1: "G", 2: "F", 3: "E", 4: "D", 5: "C", 6: "B", 7: "A", 8: "S"};
}

export default UMDatabaseUtils;

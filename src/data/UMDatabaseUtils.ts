import {Chara, SpecialCaseRace, SuccessionRelation} from './data_pb';


class UMDatabaseUtils {
    static calculateTotalPoint(relations: SuccessionRelation[]) {
        return relations.reduce((points, relation) => {
            return points + relation.getRelationPoint()!;
        }, 0);
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

    static teamRaceDistanceLabels: Record<number, string> = {1: '短距離', 2: 'マイル', 3: '中距離', 4: '長距離', 5: 'ダート'};

    static runningStyleLabels: Record<number, string> = {1: '逃げ', 2: '先行', 3: '差し', 4: '追い込み'};
}

export default UMDatabaseUtils;

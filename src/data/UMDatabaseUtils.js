import {SpecialCaseRace} from './data_pb';


class UMDatabaseUtils {
    static calculateTotalPoint(relations) {
        return relations.reduce((points, relation) => {
            return points + relation.getRelationPoint();
        }, 0);
    }

    static getRelationRank(point) {
        if (point >= 151) {
            return '◎';
        }
        if (point >= 51) {
            return '○';
        }
        return '△';
    }

    static racePermissionEnumNames = Object.keys(SpecialCaseRace.RacePermission).reduce((ret, key) => {
        ret[SpecialCaseRace.RacePermission[key]] = key;
        return ret;
    }, {});

    static charaNameWithIdAndCast(chara) {
        return `${chara.getId()} - ${UMDatabaseUtils.charaNameWithCast(chara)}`;
    }

    static charaNameWithCast(chara) {
        return `${chara.getName()} (${chara.getCastName()})`;
    }
}

export default UMDatabaseUtils;

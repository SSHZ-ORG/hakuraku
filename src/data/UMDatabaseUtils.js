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
}

export default UMDatabaseUtils;

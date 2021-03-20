import {UMDatabase} from './data_pb';

class UMDatabaseWrapper {
    static fromBinary(bytes) {
        return new UMDatabaseWrapper(UMDatabase.deserializeBinary(bytes));
    }

    constructor(/** @type UMDatabase */umdb) {
        this.umdb = umdb;

        this.charas = umdb.getCharaList().reduce((map, chara) => {
            map[chara.getId()] = chara;
            return map;
        }, {});

        this.raceInstances = umdb.getRaceInstanceList().reduce((map, race) => {
            map[race.getId()] = race;
            return map;
        }, {});
    }

    /**
     * @return {!Array<!proto.hakuraku.SuccessionRelation>}
     */
    findSuccessionRelation(/** @type {Array<Chara>}*/ charas) {
        if (charas.includes(null)) return [];

        const charaIds = charas.map(c => c.getId());
        if (new Set(charaIds).size !== charaIds.length) return [];

        return this.umdb.getSuccessionRelationList()
            .filter(relation => charaIds.every(charaId => relation.getMemberCharaIdList().includes(charaId)));
    }
}

export default UMDatabaseWrapper;

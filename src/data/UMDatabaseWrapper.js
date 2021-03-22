import {UMDatabase} from './data_pb';

class _UMDatabaseWrapper {
    /**
     * @return {!Promise}
     */
    initialize() {
        return fetch(process.env.PUBLIC_URL + '/data/umdb.binaryproto')
            .then(response => response.arrayBuffer())
            .then(response => {
                const umdb = UMDatabase.deserializeBinary(response);
                this.umdb = umdb;

                this.charas = umdb.getCharaList().reduce((map, chara) => {
                    map[chara.getId()] = chara;
                    return map;
                }, {});

                this.raceInstances = umdb.getRaceInstanceList().reduce((map, race) => {
                    map[race.getId()] = race;
                    return map;
                }, {});


                const interestingRaceInstanceIds = Array.from(umdb.getWinsSaddleList().reduce(
                    (s, ws) => {
                        ws.getRaceInstanceIdList().forEach(raceInstanceId => s.add(raceInstanceId));
                        return s;
                    },
                    new Set()));
                interestingRaceInstanceIds.sort();
                this.interestingRaceInstances = interestingRaceInstanceIds.map(id => this.raceInstances[id]);
            });
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

const UMDatabaseWrapper = new _UMDatabaseWrapper();
export default UMDatabaseWrapper;

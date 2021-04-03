import {Chara, RaceInstance, Skill, UMDatabase} from './data_pb';

class _UMDatabaseWrapper {
    umdb: UMDatabase = new UMDatabase();
    charas: Record<number, Chara> = {};
    raceInstances: Record<number, RaceInstance> = {};
    interestingRaceInstances: RaceInstance[] = [];
    skills: Record<number, Skill> = {};

    /**
     * @return {!Promise}
     */
    initialize() {
        return fetch(process.env.PUBLIC_URL + '/data/umdb.binaryproto')
            .then(response => response.arrayBuffer())
            .then(response => {
                this.umdb = UMDatabase.deserializeBinary(new Uint8Array(response));

                this.umdb.getCharaList().forEach((chara) => this.charas[chara.getId()!] = chara);

                this.umdb.getRaceInstanceList().forEach((race) => this.raceInstances[race.getId()!] = race);

                this.umdb.getSkillList().forEach((skill) => this.skills[skill.getId()!] = skill);

                const interestingRaceInstanceIds = Array.from(this.umdb.getWinsSaddleList().reduce(
                    (s, ws) => {
                        ws.getRaceInstanceIdList().forEach(raceInstanceId => s.add(raceInstanceId));
                        return s;
                    },
                    new Set<number>()));
                interestingRaceInstanceIds.sort();
                this.interestingRaceInstances = interestingRaceInstanceIds.map(id => this.raceInstances[id]);
            });
    }

    findSuccessionRelation(charas: (Chara | null | undefined)[]) {
        if (charas.includes(null) || charas.includes(undefined)) return [];

        const charaIds = charas.map(c => c!.getId()!);
        if (new Set(charaIds).size !== charaIds.length) return [];

        return this.umdb.getSuccessionRelationList()
            .filter(relation => charaIds.every(charaId => relation.getMemberCharaIdList().includes(charaId)));
    }
}

const UMDatabaseWrapper = new _UMDatabaseWrapper();
export default UMDatabaseWrapper;

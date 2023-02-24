import _ from "lodash";
import pako from "pako";
import {Card, Chara, RaceInstance, Skill, SupportCard, UMDatabase} from './data_pb';
import {Story} from "./UMDatabaseUtils";

class _UMDatabaseWrapper {
    umdb: UMDatabase = new UMDatabase();
    charas: Record<number, Chara> = {};
    cards: Record<number, Card> = {};
    supportCards: Record<number, SupportCard> = {};
    raceInstances: Record<number, RaceInstance> = {};
    interestingRaceInstances: RaceInstance[] = [];
    skills: Record<number, Skill> = {};
    successionRelationMemberCharaIds: Record<number, Set<number>> = {};
    stories: Story[] = [];

    initialize() {
        return fetch(process.env.PUBLIC_URL + '/data/umdb.binarypb.gz', {cache: 'no-cache'})
            .then(response => response.arrayBuffer())
            .then(response => {
                this.umdb = UMDatabase.fromBinary(pako.inflate(new Uint8Array(response)));

                this.umdb.chara.forEach((chara) => this.charas[chara.id!] = chara);
                this.umdb.card.forEach((card) => this.cards[card.id!] = card);
                this.umdb.supportCard.forEach((card) => this.supportCards[card.id!] = card);

                this.umdb.successionRelation.forEach((relation) =>
                    this.successionRelationMemberCharaIds[relation.relationType!] = new Set(relation.member.map(m => m.charaId!)));

                this.umdb.raceInstance.forEach((race) => this.raceInstances[race.id!] = race);

                this.umdb.skill.forEach((skill) => this.skills[skill.id!] = skill);

                this.interestingRaceInstances = _.sortedUniq(this.umdb.winsSaddle.flatMap(ws => ws.raceInstanceId))
                    .map(id => this.raceInstances[id]);

                this.stories = this.umdb.story.map(story => {
                    const o: Story = {
                        id: story.id!,
                        name: story.name!,
                    };
                    const id = story.id!;
                    if ((501000000 <= id && id < 510000000) || (801000000 <= id && id < 810000000)) {
                        o.chara = this.charas[Math.floor(id / 1000) % 10000];
                    } else if (810000000 <= id && id < 840000000) {
                        o.supportCard = this.supportCards[Math.floor(id / 1000) % 100000];
                    }

                    return o;
                });
            });
    }

    raceInstanceNameWithId = (raceInstanceId: number) =>
        `${raceInstanceId} - ${this.raceInstances[raceInstanceId]?.name ?? 'Unknown race'}`;

    skillName = (skillId: number) =>
        this.skills[skillId]?.name ?? `Unknown Skill ${skillId}`;

    skillNameWithId = (skillId: number) =>
        `[${skillId}] ${this.skills[skillId]?.name ?? 'Unknown Skill'}`;
}

const UMDatabaseWrapper = new _UMDatabaseWrapper();
export default UMDatabaseWrapper;

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

    /**
     * @return {!Promise}
     */
    initialize() {
        return fetch(process.env.PUBLIC_URL + '/data/umdb.binarypb.gz', {cache: 'no-cache'})
            .then(response => response.arrayBuffer())
            .then(response => {
                this.umdb = UMDatabase.deserializeBinary(pako.inflate(new Uint8Array(response)));

                this.umdb.getCharaList().forEach((chara) => this.charas[chara.getId()!] = chara);
                this.umdb.getCardList().forEach((card) => this.cards[card.getId()!] = card);
                this.umdb.getSupportCardList().forEach((card) => this.supportCards[card.getId()!] = card);

                this.umdb.getSuccessionRelationList().forEach((relation) =>
                    this.successionRelationMemberCharaIds[relation.getRelationType()!] = new Set(relation.getMemberList().map(m => m.getCharaId()!)));

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

                this.stories = this.umdb.getStoryList().map(story => {
                    const o: Story = {
                        id: story.getId()!,
                        name: story.getName()!,
                    };
                    const id = story.getId()!;
                    if ((501000000 <= id && id < 510000000) || (801000000 <= id && id < 810000000)) {
                        o.chara = this.charas[Math.floor(id / 1000) % 10000];
                    } else if (810000000 <= id && id < 840000000) {
                        o.supportCard = this.supportCards[Math.floor(id / 1000) % 100000];
                    }

                    return o;
                })
            });
    }

    raceInstanceNameWithId = (raceInstanceId: number) =>
        `${raceInstanceId} - ${this.raceInstances[raceInstanceId]?.getName() ?? 'Unknown race'}`;

    skillName = (skillId: number) =>
        this.skills[skillId]?.getName() ?? `Unknown Skill ${skillId}`;

    skillNameWithId = (skillId: number) =>
        `[${skillId}] ${this.skills[skillId]?.getName() ?? 'Unknown Skill'}`;
}

const UMDatabaseWrapper = new _UMDatabaseWrapper();
export default UMDatabaseWrapper;

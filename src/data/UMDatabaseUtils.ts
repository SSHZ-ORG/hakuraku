import _ from 'lodash';
import {AllTypeaheadOwnAndInjectedProps} from "react-bootstrap-typeahead";
import {toKatakana, toRomaji} from "wanakana";
import {Chara, SuccessionRelation, SupportCard} from './data_pb';
import {RaceSimulateHorseResultData_RunningStyle} from "./race_data_pb";
import UMDatabaseWrapper from "./UMDatabaseWrapper";

const normalizeRomaji = (s: string) => toRomaji(s).toLowerCase();
const normalizeKatakana = (s: string) => toKatakana(s).toLowerCase(); // To support ローマ字入力

export function calculateTotalPoint(relations: SuccessionRelation[]) {
    return _.sumBy(relations, r => r.relationPoint!);
}

export function getRelationRank(point: number) {
    if (point >= 151) {
        return '◎';
    }
    if (point >= 51) {
        return '○';
    }
    return '△';
}

export function charaNameWithIdAndCast(chara: Chara) {
    return `${chara.id} - ${charaNameWithCast(chara)}`;
}

export function charaNameWithCast(chara: Chara) {
    return `${chara.name} (${chara.castName})`;
}

export function supportCardNameWithId(supportCard: SupportCard) {
    return `${supportCard.id} - ${supportCard.name}`;
}

export function getPopularityMark(n: number) {
    const mark = n === 1 ? '◎' : n === 2 ? '○' : n === 3 ? '▲' : n === 4 || n === 5 ? '△' : '';
    return `${n}${mark}`;
}

export function findSuccessionRelation(charas: (Chara | null | undefined)[], relations: SuccessionRelation[] = UMDatabaseWrapper.umdb.successionRelation) {
    if (charas.includes(null) || charas.includes(undefined)) return [];

    const charaIds = charas.map(c => c!.id!);
    if (new Set(charaIds).size !== charaIds.length) return [];

    return relations.filter(relation => {
        return charaIds.every(charaId => UMDatabaseWrapper.successionRelationMemberCharaIds[relation.relationType!].has(charaId));
    });
}

export function charaTypeaheadMatcher(option: Chara, props: AllTypeaheadOwnAndInjectedProps<Chara>) {
    const labelKey = charaNameWithIdAndCast(option);
    return normalizeRomaji(labelKey).indexOf(normalizeRomaji(props.text)) !== -1 ||
        normalizeKatakana(labelKey).indexOf(normalizeKatakana(props.text)) !== -1;
}

export function formatTime(time: number): string {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return `${min}:${sec.toFixed(4).padStart(7, '0')}`;
}

export const teamRaceDistanceLabels: Record<number, string> =
    {1: '短距離', 2: 'マイル', 3: '中距離', 4: '長距離', 5: 'ダート'};

export const distanceLabels: Record<number, string> = {1: '短距離', 2: 'マイル', 3: '中距離', 4: '長距離'};
export const runningStyleLabels: { readonly [key in RaceSimulateHorseResultData_RunningStyle]?: string } = {
    [RaceSimulateHorseResultData_RunningStyle.NIGE]: "逃げ",
    [RaceSimulateHorseResultData_RunningStyle.SENKO]: "先行",
    [RaceSimulateHorseResultData_RunningStyle.SASHI]: "差し",
    [RaceSimulateHorseResultData_RunningStyle.OIKOMI]: "追込",
};
export const motivationLabels: Record<number, string> = {1: '絶不調', 2: '不調', 3: '普通', 4: '好調', 5: '絶好調'};

export const seasonLabels: Record<number, string> = {1: '春', 2: '夏', 3: '秋', 4: '冬', 5: '春'};
export const groundConditionLabels: Record<number, string> = {1: '良', 2: '稍重', 3: '重', 4: '不良'};
export const weatherLabels: Record<number, string> = {1: '晴', 2: '曇', 3: '雨', 4: '雪'};

export const charaProperLabels: Record<number, string> =
    {1: "G", 2: "F", 3: "E", 4: "D", 5: "C", 6: "B", 7: "A", 8: "S"};


export type Story = { id: number, name: string, chara?: Chara, supportCard?: SupportCard };

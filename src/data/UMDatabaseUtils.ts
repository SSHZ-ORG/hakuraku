import _ from 'lodash';
import {AllTypeaheadOwnAndInjectedProps} from "react-bootstrap-typeahead";
import {toKatakana, toRomaji} from "wanakana";
import {Chara, SpecialCaseRace, SuccessionRelation} from './data_pb';
import UMDatabaseWrapper from "./UMDatabaseWrapper";

const normalizeRomaji = (s: string) => toRomaji(s).toLowerCase();
const normalizeKatakana = (s: string) => toKatakana(s).toLowerCase(); // To support ローマ字入力

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

    static findSuccessionRelation(charas: (Chara | null | undefined)[], relations: SuccessionRelation[] = UMDatabaseWrapper.umdb.getSuccessionRelationList()) {
        if (charas.includes(null) || charas.includes(undefined)) return [];

        const charaIds = charas.map(c => c!.getId()!);
        if (new Set(charaIds).size !== charaIds.length) return [];

        return relations.filter(relation => {
            return charaIds.every(charaId => UMDatabaseWrapper.successionRelationMemberCharaIds[relation.getRelationType()!].has(charaId));
        });
    }

    static charaTypeaheadMatcher(option: Chara, props: AllTypeaheadOwnAndInjectedProps<Chara>) {
        const labelKey = UMDatabaseUtils.charaNameWithIdAndCast(option);
        return normalizeRomaji(labelKey).indexOf(normalizeRomaji(props.text)) !== -1 ||
            normalizeKatakana(labelKey).indexOf(normalizeKatakana(props.text)) !== -1;
    }

    static formatTime(time: number): string {
        const min = Math.floor(time / 60);
        const sec = time - min * 60;
        return `${min}:${sec.toFixed(4).padStart(7, '0')}`;
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

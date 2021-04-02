import React from 'react';
import {Form} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {AllTypeaheadOwnAndInjectedProps, Typeahead} from "react-bootstrap-typeahead";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import memoize from "memoize-one";
import {toKatakana, toRomaji} from 'wanakana';
import {Chara} from "../data/data_pb";

const normalizeRomaji = (s: string) => toRomaji(s).toLowerCase();
const normalizeKatakana = (s: string) => toKatakana(s).toLowerCase(); // To support ローマ字入力

type CharaSelectorProps = {
    label: string,
    selectedChara: Chara | undefined,
    onSelectedCharaChange: (chara: Chara) => void,
    constraintGroups?: (Chara | undefined)[][] | undefined,
}

class CharaSelector extends React.Component<CharaSelectorProps> {

    calcRelationPoints = memoize((constraintGroups: (Chara | undefined)[][] | undefined) => {
        if (!constraintGroups) {
            return {};
        }

        const result: Record<number, number[]> = {};
        UMDatabaseWrapper.umdb.getCharaList().forEach(chara => {
            result[chara.getId()!] =
                constraintGroups.map(group => UMDatabaseUtils.calculateTotalPoint(UMDatabaseWrapper.findSuccessionRelation(group.concat(chara))));
        });
        return result;
    })

    onSelectionChange(selectedChara: Chara) {
        this.props.onSelectedCharaChange(selectedChara);
    }

    charaList() {
        const relationPoints = Object.fromEntries(Object.entries(this.calcRelationPoints(this.props.constraintGroups))
            .map(([k, v]) => [k, v.reduce((a, b) => a + b, 0)]));
        let l = UMDatabaseWrapper.umdb.getCharaList();
        if (this.props.constraintGroups) {
            l = l.slice().sort((a, b) => relationPoints[b.getId()!] - relationPoints[a.getId()!]);
        }
        return l;
    }

    charaRenderingName(chara: Chara) {
        let suggestionPtsString = '';
        if (this.props.constraintGroups) {
            const points = this.calcRelationPoints(this.props.constraintGroups)[chara.getId()!];
            if (points.length === 1) {
                suggestionPtsString = ` (${points[0]} pts)`;
            } else {
                suggestionPtsString = ` (${points.map(p => p.toString()).join(' + ')} = ${points.reduce((a, b) => a + b, 0)} pts)`;
            }
        }
        return UMDatabaseUtils.charaNameWithIdAndCast(chara) + suggestionPtsString;
    }

    typeaheadMatcher(option: Chara, props: AllTypeaheadOwnAndInjectedProps<Chara>) {
        const labelKey = UMDatabaseUtils.charaNameWithIdAndCast(option);
        return normalizeRomaji(labelKey).indexOf(normalizeRomaji(props.text)) !== -1 ||
            normalizeKatakana(labelKey).indexOf(normalizeKatakana(props.text)) !== -1;
    }

    render() {
        return <Form.Group>
            <Form.Label>{this.props.label}</Form.Label>
            <Typeahead
                clearButton
                labelKey={chara => this.charaRenderingName(chara)}
                options={this.charaList()}
                selected={this.props.selectedChara ? [this.props.selectedChara] : []}
                onChange={(selection) => this.onSelectionChange(selection[0])}
                filterBy={(option, props) => this.typeaheadMatcher(option, props)}
                isInvalid={!this.props.selectedChara}/>
        </Form.Group>
    }
}

export default CharaSelector;

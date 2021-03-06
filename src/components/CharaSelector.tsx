import React from 'react';
import {Form} from 'react-bootstrap';
import {AllTypeaheadOwnAndInjectedProps, Typeahead} from "react-bootstrap-typeahead";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import memoize from "memoize-one";
import {toKatakana, toRomaji} from 'wanakana';
import {Chara} from "../data/data_pb";
import _ from "lodash";

const normalizeRomaji = (s: string) => toRomaji(s).toLowerCase();
const normalizeKatakana = (s: string) => toKatakana(s).toLowerCase(); // To support ローマ字入力

type CharaSelectorProps = {
    label: string,
    selectedChara: Chara | undefined,
    onSelectedCharaChange: (chara: Chara) => void,
    constraintGroups?: (Chara | undefined)[][] | undefined,
}

export default class CharaSelector extends React.Component<CharaSelectorProps> {

    calcRelationPoints = memoize((constraintGroups: (Chara | undefined)[][] | undefined) => {
        if (!constraintGroups) {
            return {};
        }

        return _.mapValues(UMDatabaseWrapper.charas,
            (chara) => constraintGroups.map(group =>
                UMDatabaseUtils.calculateTotalPoint(UMDatabaseWrapper.findSuccessionRelation(group.concat(chara)))));
    })

    onSelectionChange(selectedChara: Chara) {
        this.props.onSelectedCharaChange(selectedChara);
    }

    charaList() {
        let l = UMDatabaseWrapper.umdb.getCharaList();
        if (this.props.constraintGroups) {
            const relationPoints = _.mapValues(this.calcRelationPoints(this.props.constraintGroups), _.sum);
            l = _.sortBy(l, chara => -relationPoints[chara.getId()!]);
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
                suggestionPtsString = ` (${points.map(p => p.toString()).join(' + ')} = ${_.sum(points)} pts)`;
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

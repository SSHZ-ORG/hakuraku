import React from 'react';
import {Form} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Typeahead} from "react-bootstrap-typeahead";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import memoize from "memoize-one";
import {toKatakana, toRomaji} from 'wanakana';

const normalizeRomaji = (s) => toRomaji(s).toLowerCase();
const normalizeKatakana = (s) => toKatakana(s).toLowerCase(); // To support ローマ字入力


class CharaSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChara: undefined,
        };
    }


    onSelectionChange(selectedChara) {
        this.setState({selectedChara: selectedChara});
        this.props.onSelectedCharaChange(selectedChara);
    }

    calcRelationPoints = memoize((constraintGroups) => {
        if (!constraintGroups) {
            return {};
        }

        const result = {};
        UMDatabaseWrapper.umdb.getCharaList().forEach(chara => {
            result[chara.getId()] =
                constraintGroups.map(group => UMDatabaseUtils.calculateTotalPoint(UMDatabaseWrapper.findSuccessionRelation(group.concat(chara))))
                    .reduce((a, b) => a + b, 0);
        });
        return result;
    })

    charaList() {
        const relationPoints = this.calcRelationPoints(this.props.constraintGroups);
        let l = UMDatabaseWrapper.umdb.getCharaList();
        if (this.props.constraintGroups) {
            l = l.slice().sort((a, b) => relationPoints[b.getId()] - relationPoints[a.getId()]);
        }
        return l;
    }

    charaBasicRenderingName(chara) {
        return `${chara.getId()} - ${chara.getName()} (${chara.getCastName()})`
    }

    charaRenderingName(chara) {
        const suggestionPtsString = this.props.constraintGroups ? ` (${this.calcRelationPoints(this.props.constraintGroups)[chara.getId()]} pts)` : '';
        return this.charaBasicRenderingName(chara) + suggestionPtsString;
    }

    typeaheadMatcher(option, props) {
        const labelKey = this.charaBasicRenderingName(option);
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
                selected={this.state.selectedChara ? [this.state.selectedChara] : []}
                onChange={(selection) => this.onSelectionChange(selection[0])}
                filterBy={(option, props) => this.typeaheadMatcher(option, props)}
                isInvalid={!this.state.selectedChara}/>
        </Form.Group>
    }
}

export default CharaSelector;

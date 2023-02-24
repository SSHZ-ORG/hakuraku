import _ from "lodash";
import memoize from "memoize-one";
import React from 'react';
import {Form} from 'react-bootstrap';
import {Typeahead} from "react-bootstrap-typeahead";
import {Chara} from "../data/data_pb";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

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
                UMDatabaseUtils.calculateTotalPoint(UMDatabaseUtils.findSuccessionRelation(group.concat(chara)))));
    });

    onSelectionChange(selectedChara: Chara) {
        this.props.onSelectedCharaChange(selectedChara);
    }

    charaList() {
        let l = UMDatabaseWrapper.umdb.chara;
        if (this.props.constraintGroups) {
            const relationPoints = _.mapValues(this.calcRelationPoints(this.props.constraintGroups), _.sum);
            l = _.sortBy(l, chara => -relationPoints[chara.id!]);
        }
        return l;
    }

    charaRenderingName(chara: Chara) {
        let suggestionPtsString = '';
        if (this.props.constraintGroups) {
            const points = this.calcRelationPoints(this.props.constraintGroups)[chara.id!];
            if (points.length === 1) {
                suggestionPtsString = ` (${points[0]} pts)`;
            } else {
                suggestionPtsString = ` (${points.map(p => p.toString()).join(' + ')} = ${_.sum(points)} pts)`;
            }
        }
        return UMDatabaseUtils.charaNameWithIdAndCast(chara) + suggestionPtsString;
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
                filterBy={UMDatabaseUtils.charaTypeaheadMatcher}
                isInvalid={!this.props.selectedChara}/>
        </Form.Group>;
    }
}

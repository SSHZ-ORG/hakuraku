import _ from "lodash";
import React from "react";
import {Form} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import FoldCard from "../components/FoldCard";
import SuccessionRelationChip from "../components/SuccessionRelationChip";
import {Chara, SuccessionRelation} from "../data/data_pb";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

const GROUP_TYPE_TAGS: Record<string, string> = {
    '1': '学年',
    '2': '寮',
    '3': '同室',
    '20': '同じ父',
    '21': '同じ父の父・母の父',
    '23': '母の父',
    '25': 'G1 勝鞍',
    '26': '性別・？',
    '27': '生月日',
    '28': '生年',
    '29': '脚質適性',
    '30': '距離適性',
    '31': '馬場適性',
    '32': '生月',
};

type SuccessionRelationsPageState = {
    selectedCharas: Chara[],
    showRelationId: boolean,
}

export default class SuccessionRelationsPage extends React.PureComponent<{}, SuccessionRelationsPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedCharas: [],
            showRelationId: true,
        }
    }

    renderRelationsGroups(relations: SuccessionRelation[], key: string) {
        return <FoldCard header={`Relations ${key}xx ${GROUP_TYPE_TAGS[key] ?? ''}`}>
            {UMDatabaseUtils.findSuccessionRelation(this.state.selectedCharas, relations)
                .map(r => <><SuccessionRelationChip relation={r} showId={this.state.showRelationId}/>{' '}</>)}
        </FoldCard>;
    }

    render() {
        const relationsGroups = _.groupBy(UMDatabaseWrapper.umdb.successionRelation,
            r => Math.floor(r.relationType! / 100));

        return <>
            <Form.Group>
                <Form.Label>Filter by</Form.Label>
                <Typeahead
                    multiple
                    labelKey={UMDatabaseUtils.charaNameWithIdAndCast}
                    options={UMDatabaseWrapper.umdb.chara}
                    selected={this.state.selectedCharas}
                    onChange={s => this.setState({selectedCharas: s})}
                    filterBy={UMDatabaseUtils.charaTypeaheadMatcher}/>
            </Form.Group>

            <Form.Group>
                <Form.Switch
                    checked={this.state.showRelationId}
                    onChange={(e) => this.setState({showRelationId: e.target.checked})}
                    id="show-relation-id"
                    label="Show SuccessionRelationMember IDs"/>
            </Form.Group>

            {_.map(relationsGroups, (g, k) => this.renderRelationsGroups(g, k))}
        </>;
    }
}

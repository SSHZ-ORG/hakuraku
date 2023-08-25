import _ from "lodash";
import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import FoldCard from "../components/FoldCard";
import SuccessionRelationChip from "../components/SuccessionRelationChip";
import {Chara, SuccessionRelation} from "../data/data_pb";
import * as UMDatabaseUtils from "../data/UMDatabaseUtils";
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

export default function SuccessionRelationsPage() {
    const [selectedCharas, setSelectedCharas] = useState<Chara[]>([]);
    const [showRelationId, setShowRelationId] = useState(false);
    
    function renderRelationsGroups(relations: SuccessionRelation[], key: string) {
        return <FoldCard header={`Relations ${key}xx ${GROUP_TYPE_TAGS[key] ?? ''}`}>
            {UMDatabaseUtils.findSuccessionRelation(selectedCharas, relations)
                .map(r => <><SuccessionRelationChip relation={r} showId={showRelationId}/>{' '}</>)}
        </FoldCard>;
    }

    const relationsGroups = _.groupBy(UMDatabaseWrapper.umdb.successionRelation,
        r => Math.floor(r.relationType! / 100));

    return <>
        <Form.Group>
            <Form.Label>Filter by</Form.Label>
            <Typeahead
                multiple
                labelKey={UMDatabaseUtils.charaNameWithIdAndCast}
                options={UMDatabaseWrapper.umdb.chara}
                selected={selectedCharas}
                onChange={setSelectedCharas}
                filterBy={UMDatabaseUtils.charaTypeaheadMatcher}/>
        </Form.Group>

        <Form.Group>
            <Form.Switch
                checked={showRelationId}
                onChange={(e) => setShowRelationId(e.target.checked)}
                id="show-relation-id"
                label="Show SuccessionRelationMember IDs"/>
        </Form.Group>

        {_.map(relationsGroups, (g, k) => renderRelationsGroups(g, k))}
    </>;
}

import React from "react";
import {Badge, OverlayTrigger, Popover} from "react-bootstrap";
import {SuccessionRelation} from "../data/data_pb";
import * as UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

type SuccessionRelationChipProps = {
    relation: SuccessionRelation,
    showId: boolean,
}

export default function SuccessionRelationChip(props: SuccessionRelationChipProps) {
    const renderTooltip = <Popover id="popover">
        <Popover.Title>
            Group {props.relation.relationType} - {props.relation.relationPoint} pts
        </Popover.Title>
        <Popover.Content>
            {props.relation.member.map(m => <>{props.showId ? `[${m.id}] ` : ''}{UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[m.charaId!])}<br/></>)}
        </Popover.Content>
    </Popover>;

    return <OverlayTrigger overlay={renderTooltip} placement="auto">
        <Badge variant="secondary">
            Grp {props.relation.relationType} - {props.relation.relationPoint} pts
        </Badge>
    </OverlayTrigger>;
}

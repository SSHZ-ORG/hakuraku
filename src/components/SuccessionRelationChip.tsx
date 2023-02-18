import React from "react";
import {Badge, OverlayTrigger, Popover} from "react-bootstrap";
import {SuccessionRelation} from "../data/data_pb";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

type SuccessionRelationChipProps = {
    relation: SuccessionRelation,
    showId: boolean,
}

export default class SuccessionRelationChip extends React.PureComponent<SuccessionRelationChipProps> {
    render() {
        const renderTooltip = <Popover id="popover">
            <Popover.Title>
                Group {this.props.relation.relationType} - {this.props.relation.relationPoint} pts
            </Popover.Title>
            <Popover.Content>
                {this.props.relation.member.map(m => <>{this.props.showId ? `[${m.id}] ` : ''}{UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[m.charaId!])}<br/></>)}
            </Popover.Content>
        </Popover>;

        return <OverlayTrigger overlay={renderTooltip} placement="auto">
            <Badge variant="secondary">
                Grp {this.props.relation.relationType} - {this.props.relation.relationPoint} pts
            </Badge>
        </OverlayTrigger>;
    }
}

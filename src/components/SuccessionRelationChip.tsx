import React from "react";
import {Badge, OverlayTrigger, Popover} from "react-bootstrap";
import {SuccessionRelation} from "../data/data_pb";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

type SuccessionRelationChipProps = {
    relation: SuccessionRelation,
}

export default class SuccessionRelationChip extends React.PureComponent<SuccessionRelationChipProps> {
    render() {
        const renderTooltip = <Popover id="popover">
            <Popover.Title>
                Group {this.props.relation.getRelationType()} - {this.props.relation.getRelationPoint()} pts
            </Popover.Title>
            <Popover.Content>
                {this.props.relation.getMemberCharaIdList().map(i => <>{UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[i])}<br/></>)}
            </Popover.Content>
        </Popover>;

        return <OverlayTrigger overlay={renderTooltip} placement="auto">
            <Badge variant="secondary">
                Grp {this.props.relation.getRelationType()} - {this.props.relation.getRelationPoint()} pts
            </Badge>
        </OverlayTrigger>;
    }
}

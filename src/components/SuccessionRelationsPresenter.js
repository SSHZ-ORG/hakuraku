import React from "react";
import {Badge, Card, OverlayTrigger, Popover} from "react-bootstrap";
import UMDatabaseUtils from "../data/UMDatabaseUtils";

class SuccessionRelationsPresenter extends React.Component {
    formatRelation(relation) {
        const renderTooltip = <Popover id="popover">
            <Popover.Title>
                Group {relation.getRelationType()} - {relation.getRelationPoint()} pts
            </Popover.Title>
            <Popover.Content>
                {relation.getMemberCharaIdList().map(charaId => this.props.umdb.charas[charaId].getName()).join(', ')}
            </Popover.Content>
        </Popover>;

        return <OverlayTrigger overlay={renderTooltip}>
            <Badge variant="secondary">
                Grp {relation.getRelationType()} - {relation.getRelationPoint()} pts
            </Badge>
        </OverlayTrigger>
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.title} - {UMDatabaseUtils.calculateTotalPoint(this.props.relations)} pts</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.props.relations.map(relation => this.formatRelation(relation))}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default SuccessionRelationsPresenter;

import React from "react";
import {Badge, Card, OverlayTrigger, Popover} from "react-bootstrap";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import {SuccessionRelation} from "../data/data_pb";

type SuccessionRelationsPresenterProps = {
    title: string,
    relations: SuccessionRelation[],
}

export default class SuccessionRelationsPresenter extends React.PureComponent<SuccessionRelationsPresenterProps> {
    formatRelation(relation: SuccessionRelation) {
        const renderTooltip = <Popover id="popover">
            <Popover.Title>
                Group {relation.getRelationType()} - {relation.getRelationPoint()} pts
            </Popover.Title>
            <Popover.Content>
                {relation.getMemberCharaIdList().map(i => <>{UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[i])}<br/></>)}
            </Popover.Content>
        </Popover>;

        return <>
            <OverlayTrigger overlay={renderTooltip}>
                <Badge variant="secondary">
                    Grp {relation.getRelationType()} - {relation.getRelationPoint()} pts
                </Badge>
            </OverlayTrigger>{" "}
        </>;
    }

    render() {
        return <Card>
            <Card.Header>{this.props.title} - {UMDatabaseUtils.calculateTotalPoint(this.props.relations)} pts</Card.Header>
            <Card.Body>
                <Card.Text>
                    {this.props.relations.map(relation => this.formatRelation(relation))}
                </Card.Text>
            </Card.Body>
        </Card>;
    }
}

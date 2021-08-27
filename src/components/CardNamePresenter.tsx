import React from "react";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

type CardNamePresenterProps = {
    cardId: number,
}

export default class CardNamePresenter extends React.PureComponent<CardNamePresenterProps> {
    render() {
        const renderTooltip = <Tooltip id="tooltip">
            {UMDatabaseWrapper.cards[this.props.cardId]?.getName() ?? 'Unknown Card'}
        </Tooltip>;

        return <OverlayTrigger overlay={renderTooltip}>
            <Badge variant="secondary">
                {this.props.cardId}
            </Badge>
        </OverlayTrigger>;
    }
}

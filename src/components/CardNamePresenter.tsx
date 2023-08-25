import React from "react";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

type CardNamePresenterProps = {
    cardId: number,
}

export default function CardNamePresenter(props: CardNamePresenterProps) {
    const renderTooltip = <Tooltip id="tooltip">
        {UMDatabaseWrapper.cards[props.cardId]?.name ?? 'Unknown Card'}
    </Tooltip>;

    return <OverlayTrigger overlay={renderTooltip}>
        <Badge variant="secondary">
            {props.cardId}
        </Badge>
    </OverlayTrigger>;
}

import React, {useState} from "react";
import {Card} from "react-bootstrap";

type FoldCardProps = {
    header: string,
    children: React.ReactNode,
}

export default function FoldCard(props: FoldCardProps) {
    const [extended, setExtended] = useState(false);

    return <Card>
        <Card.Header className="fold-card-header" onClick={() => setExtended(!extended)}>
            {props.header}
        </Card.Header>
        {extended && <Card.Body>
            <>{props.children}</>
        </Card.Body>}
    </Card>;
}

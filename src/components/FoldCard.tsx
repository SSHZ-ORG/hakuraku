import React from "react";
import {Card} from "react-bootstrap";

type FoldCardProps = {
    header: string,
    children: React.ReactNode,
}

type FoldCardState = {
    extended: boolean,
}

export default class FoldCard extends React.PureComponent<FoldCardProps, FoldCardState> {
    constructor(props: FoldCardProps) {
        super(props);

        this.state = {
            extended: false,
        }
    }

    render() {
        return <Card>
            <Card.Header className='fold-card-header' onClick={() => this.setState({extended: !this.state.extended})}>
                {this.props.header}
            </Card.Header>
            {this.state.extended &&
                <Card.Body>
                    <>{this.props.children}</>
                </Card.Body>}
        </Card>
    }
}

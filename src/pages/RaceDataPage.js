import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import ReactJson from "react-json-view";
import {deserializeFromBase64} from "../data/RaceDataParser";

export default class RaceDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            raceScenarioInput: '',
            parsedRaceData: undefined,
        }
    }

    parse() {
        this.setState({
            parsedRaceData: deserializeFromBase64(this.state.raceScenarioInput).toObject()
        });
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control as="textarea" rows={3}
                                          onChange={e => this.setState({raceScenarioInput: e.target.value})}/>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" onClick={() => this.parse()}>
                        Parse
                    </Button>
                </Form>

                <hr/>

                <ReactJson src={this.state.parsedRaceData} collapsed="1"/>
            </div>
        )
    }
}


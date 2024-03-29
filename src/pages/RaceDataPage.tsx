import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import RaceDataPresenter from "../components/RaceDataPresenter";
import {RaceSimulateData} from "../data/race_data_pb";
import {deserializeFromBase64} from "../data/RaceDataParser";

type RaceDataPageState = {
    raceHorseInfoInput: string,
    raceScenarioInput: string,

    parsedHorseInfo: any,
    parsedRaceData: RaceSimulateData | undefined,
};

export default class RaceDataPage extends React.Component<{}, RaceDataPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            raceHorseInfoInput: '',
            raceScenarioInput: '',

            parsedHorseInfo: undefined,
            parsedRaceData: undefined,
        };
    }

    parse() {
        this.setState({parsedRaceData: deserializeFromBase64(this.state.raceScenarioInput.trim())});
        try {
            this.setState({parsedHorseInfo: JSON.parse(this.state.raceHorseInfoInput)});
        } catch (e) {
            this.setState({parsedHorseInfo: undefined});
        }
    }

    render() {
        return <>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>
                            [Optional] <code>race_start_info.race_horse_data</code> (for single
                            mode), <code>race_horse_data_array</code> (for daily race / legend race, not in the same
                            packet), or <code>race_start_params_array.race_horse_data_array</code> (for team race)
                        </Form.Label>
                        <Form.Control as="textarea" rows={3}
                                      onChange={e => this.setState({raceHorseInfoInput: e.target.value})}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>[Required] <code>race_scenario</code></Form.Label>
                        <Form.Control as="textarea" rows={3}
                                      onChange={e => this.setState({raceScenarioInput: e.target.value})}/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" onClick={() => this.parse()}>
                    Parse
                </Button>
            </Form>

            <hr/>

            {this.state.parsedRaceData &&
                <RaceDataPresenter
                    raceHorseInfo={this.state.parsedHorseInfo}
                    raceData={this.state.parsedRaceData}/>}
        </>;
    }

}


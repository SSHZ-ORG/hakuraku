import React, {ChangeEvent} from "react";
import {Col, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import ReactJson from "react-json-view";
// @ts-ignore
import msgpack from "@ygoe/msgpack";
// @ts-ignore
import struct from "@aksel/structjs";
import {deserializeFromBase64} from "../data/RaceDataParser";
import RaceDataPresenter from "../components/RaceDataPresenter";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";

type CarrotJuicerPageState = {
    selectedFiles: File[],
    currentFile: File | undefined,
    currentFileContent: any,

    selectedTeamRace: number | undefined,
};

export default class CarrotJuicerPage extends React.Component<{}, CarrotJuicerPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedFiles: [],
            currentFile: undefined,
            currentFileContent: undefined,
            selectedTeamRace: undefined,
        }
    }

    onSelectedFilesChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null || e.target.files.length === 0) {
            return;
        }
        // @ts-ignore
        this.setState({selectedFiles: Array.from(e.target.files)});
    }

    skipRequestHeader(buffer: ArrayBuffer) {
        const offset = struct('<i').unpack_from(buffer, 0)[0];
        return buffer.slice(4 + offset);
    }

    onCurrentFileChange(file: File) {
        this.setState({currentFile: file});

        file.arrayBuffer().then((content: ArrayBuffer) => {
            const bytesToUse = file.name.endsWith("Q.msgpack") ? this.skipRequestHeader(content) : content;
            this.setState({currentFileContent: msgpack.deserialize(bytesToUse)});
        });
    }

    raceDataPresenter() {
        if (!this.state.currentFileContent) {
            return undefined;
        }
        if (!this.state.currentFileContent['data']) {
            return undefined;
        }
        const data = this.state.currentFileContent['data'];

        if (data['race_scenario'] && data['race_start_info']) {
            // Single mode
            return <>
                <RaceDataPresenter
                    raceHorseInfo={data['race_start_info']['race_horse_data']}
                    raceData={deserializeFromBase64(data['race_scenario'])}/>
                <hr/>
            </>;
        } else if (data['race_start_params_array'] && data['race_result_array'] && data['race_start_params_array'].length === data['race_result_array'].length) {
            // Team race
            return <>
                <Form>
                    <Form.Group>
                        <Form.Label>Team Race</Form.Label>
                        <Form.Control as="select" custom
                                      onChange={(e) => this.setState({selectedTeamRace: e.target.value ? parseInt(e.target.value) : undefined})}>
                            <option value="">-</option>
                            {data['race_start_params_array'].map((race: any, idx: number) => {
                                return <option value={idx}>
                                    [{idx + 1}]{' '}
                                    [{UMDatabaseUtils.teamRaceDistanceLabels[data['race_result_array'][idx]['distance_type']] ?? 'Unknown type'}]{' '}
                                    {UMDatabaseWrapper.raceInstanceNameWithId(race['race_instance_id'])}
                                </option>
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form>
                {this.state.selectedTeamRace !== undefined &&
                <RaceDataPresenter
                    raceHorseInfo={data['race_start_params_array'][this.state.selectedTeamRace]['race_horse_data_array']}
                    raceData={deserializeFromBase64(data['race_result_array'][this.state.selectedTeamRace]['race_scenario'])}/>}
                <hr/>
            </>;
        } else {
            return undefined;
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.File label="Select the packets captured by CarrotJuicer here..." custom multiple
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => this.onSelectedFilesChange(e)}/>
                                <Form.Text muted>
                                    Use <a href="https://github.com/CNA-Bld/Riru-CarrotJuicer"
                                           target="_blank" rel="noreferrer">Riru-CarrotJuicer</a>{' '}
                                    to capture your packets. Select a packet containing a single mode race, or a group
                                    of team races to inspect and visualize them here.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row style={{height: '90vh'}}>
                    <Col style={{maxHeight: '100%', overflowY: 'auto'}}>
                        <ListGroup>
                            {this.state.selectedFiles.map(file =>
                                <ListGroupItem action onClick={() => this.onCurrentFileChange(file)}
                                               active={file === this.state.currentFile}>
                                    {file.name}
                                </ListGroupItem>)}
                        </ListGroup>
                    </Col>
                    <Col xs="8" style={{maxHeight: '100%', overflowY: 'auto'}}>
                        {this.raceDataPresenter()}
                        <ReactJson src={this.state.currentFileContent} collapsed={2}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

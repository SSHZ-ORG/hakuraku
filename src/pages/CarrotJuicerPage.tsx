// @ts-ignore
import struct from "@aksel/structjs";
import {JsonViewer} from "@textea/json-viewer";
import msgpack from "@ygoe/msgpack";
import React from "react";
import {Col, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import FilesSelector from "../components/FilesSelector";
import RaceDataPresenter from "../components/RaceDataPresenter";
import {deserializeFromBase64} from "../data/RaceDataParser";
import * as UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

function teamRaceHeader(race: any): string {
    const parts = [
        `${UMDatabaseWrapper.raceInstances[race['race_instance_id']]?.distance ?? '?'}m`,
        UMDatabaseUtils.seasonLabels[race['season']] ?? '?',
        UMDatabaseUtils.weatherLabels[race['weather']] ?? '?',
        UMDatabaseUtils.groundConditionLabels[race['ground_condition']] ?? '?',
    ];

    return parts.join(' / ');
}

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
        };
    }

    onSelectedFilesChange(files: File[]) {
        if (files.length === 0) {
            return;
        }
        this.setState({selectedFiles: files});
    }

    skipRequestHeader(buffer: ArrayBuffer) {
        const offset = struct('<i').unpack_from(buffer, 0)[0];
        return buffer.slice(4 + offset);
    }

    onCurrentFileChange(file: File) {
        this.setState({currentFile: file});

        file.arrayBuffer().then((content: ArrayBuffer) => {
            const bytesToUse = file.name.endsWith("Q.msgpack") ? this.skipRequestHeader(content) : content;
            try {
                this.setState({currentFileContent: msgpack.deserialize(bytesToUse)});
            } catch (e) {
                console.log("Failed to parse file!", file, e);
            }
        });
    }

    teamRaceDataPresenter(raceStartParamsArray: any, raceResultArray: any) {
        return <>
            <Form>
                <Form.Group>
                    <Form.Label>Team Race</Form.Label>
                    <Form.Control as="select" custom
                                  onChange={(e) => this.setState({selectedTeamRace: e.target.value ? parseInt(e.target.value) : undefined})}>
                        <option value="">-</option>
                        {raceStartParamsArray.map((race: any, idx: number) => {
                            const distanceType: keyof typeof UMDatabaseUtils.teamRaceDistanceLabels = raceResultArray[idx]['distance_type'];
                            return <option value={idx}>
                                [{idx + 1}]{' '}
                                [{UMDatabaseUtils.teamRaceDistanceLabels[distanceType] ?? 'Unknown type'}]{' '}
                                {UMDatabaseWrapper.raceInstanceNameWithId(race['race_instance_id'])}
                            </option>;
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
            {this.state.selectedTeamRace !== undefined &&
                <>
                    {teamRaceHeader(raceStartParamsArray[this.state.selectedTeamRace])}
                    <RaceDataPresenter
                        raceHorseInfo={raceStartParamsArray[this.state.selectedTeamRace]['race_horse_data_array']}
                        raceData={deserializeFromBase64(raceResultArray[this.state.selectedTeamRace]['race_scenario'])}/>
                </>}
            <hr/>
        </>;
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
            return this.teamRaceDataPresenter(data['race_start_params_array'], data['race_result_array']);
        } else if (data['team_data_set'] && data['team_data_set']['race_result_array']) {
            // Aoharu
            return this.teamRaceDataPresenter(data['team_data_set']['race_result_array'], data['team_data_set']['race_result_array']);
        } else if (data['room_info'] && data['room_info']['race_scenario'] && data['race_horse_data_array']) {
            // Room race (Taurus Cup)
            return <>
                <RaceDataPresenter
                    raceHorseInfo={data['race_horse_data_array']}
                    raceData={deserializeFromBase64(data['room_info']['race_scenario'])}/>
                <hr/>
            </>;
        } else if (data['race_scenario'] && data['race_horse_data_array']) {
            // Room match
            return <>
                <RaceDataPresenter
                    raceHorseInfo={data['race_horse_data_array']}
                    raceData={deserializeFromBase64(data['race_scenario'])}/>
                <hr/>
            </>;
        } else if (data['race_result_info']) {
            // Practice race
            return <>
                <RaceDataPresenter
                    raceHorseInfo={data['race_result_info']['race_horse_data_array']}
                    raceData={deserializeFromBase64(data['race_result_info']['race_scenario'])}/>
                <hr/>
            </>;
        } else {
            return undefined;
        }
    }

    render() {
        return <>
            <Row>
                <Col>
                    <FilesSelector onFilesChange={files => this.onSelectedFilesChange(files)}
                                   instructions="Select a packet containing a single mode race, a group of team stadium races, a room race (Taurus cup etc.) or a room match to inspect and visualize them here."/>
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
                    <JsonViewer value={this.state.currentFileContent} defaultInspectDepth={2}/>
                </Col>
            </Row>
        </>;
    }
}

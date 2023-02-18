import _ from "lodash";
import React from "react";
import {Alert, Col, Form, Row, Table} from "react-bootstrap";
import BootstrapTable, {ColumnDescription, ExpandRowProps} from "react-bootstrap-table-next";
import CardNamePresenter from "../components/CardNamePresenter";
import CharaProperLabels from "../components/CharaProperLabels";
import CopyButton from "../components/CopyButton";
import FilesSelector from "../components/FilesSelector";
import {Chara, RaceInstance_GroundType} from "../data/data_pb";
import {parse, RoomRaceCharaData, RoomRaceData} from "../data/RoomRaceParser";
import {TrainedCharaData} from "../data/TrainedCharaData";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

type RoomRaceAnalyzerPageState = {
    selectedFiles: File[],

    aggregatedCharaDatas: AggregatedCharaData[],
    distances: Set<number>,
    distanceType: number | undefined,
    groundType: RaceInstance_GroundType,

    viewerOnly: boolean,
    loading: boolean,
};

type AggregatedCharaData = {
    key: string,
    viewerIdAtLeastOneMatches: boolean,

    trainedChara: TrainedCharaData,
    chara: Chara | undefined,

    raceCount: number,
    finishOrders: Record<number, number>,
    averageTime: number,
    averageRawTime: number,

    skillsActivationDistances: Record<number, number[]>,
}

function toDistanceType(distance: number): number | undefined {
    if (distance < 1200) {
        return undefined;
    }
    if (distance < 1600) {
        return 1;
    }
    if (distance < 2000) {
        return 2;
    }
    if (distance < 2500) {
        return 3;
    }
    return 4;
}

const expandRow: ExpandRowProps<AggregatedCharaData> = {
    renderer: row => (
        <div className="d-flex flex-row align-items-start">
            <Table size="small" className="w-auto m-2">
                <tbody>
                {row.trainedChara.skills.map(cs => {
                        const distances = (row.skillsActivationDistances[cs.skillId] ?? []).sort((a, b) => a - b);
                        return <tr>
                            <td>{UMDatabaseWrapper.skillNameWithId(cs.skillId)}</td>
                            <td>Lv {cs.level}</td>
                            <td>{distances.length}</td>
                            <td>({(100 * distances.length / row.raceCount).toFixed(2)}%)</td>
                            <td>{distances.map(d => d.toFixed(2)).join(', ')}</td>
                        </tr>
                    }
                )}
                </tbody>
            </Table>
            <CharaProperLabels chara={row.trainedChara}/>
        </div>
    ),
    showExpandColumn: true,
};


export default class RoomRaceAnalyzerPage extends React.Component<{}, RoomRaceAnalyzerPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedFiles: [],
            aggregatedCharaDatas: [],
            distances: new Set(),
            distanceType: undefined,
            groundType: RaceInstance_GroundType.UNKNOWN_GROUND_TYPE,
            viewerOnly: true,
            loading: false,
        };
    }

    aggregatedCharaDataColumns: ColumnDescription<AggregatedCharaData>[] = [
        {
            dataField: 'copy',
            isDummyField: true,
            text: '',
            formatter: (cell, row) => <CopyButton content={JSON.stringify(row.trainedChara.rawData)}/>,
        },

        {
            dataField: 'chara',
            text: '',
            formatter: (chara: Chara | undefined, row) => chara ? <>
                {chara.id} - {chara.name}
                <br/>({chara.castName}){' '}<CardNamePresenter cardId={row.trainedChara.cardId}/>
            </> : 'Unknown Chara',
        },

        {
            dataField: 'df1',
            isDummyField: true,
            text: 'ト',
            formatter: (cell, row) => <>
                {row.trainedChara.viewerName}
                <br/>{row.trainedChara.viewerId} - {row.trainedChara.trainedCharaId}
            </>,
        },

        {
            dataField: 'finishOrders',
            text: '',
            formatter: cell => `${cell[0] ?? 0}-${cell[1] ?? 0}-${cell[2] ?? 0}-${cell[3] ?? 0}-${cell[4] ?? 0}-${cell[5] ?? 0}`
        },
        {
            dataField: 'df2',
            isDummyField: true,
            text: 'Avg Time',
            formatter: (cell, row) => <>
                {UMDatabaseUtils.formatTime(row.averageTime)}
                <br/>{UMDatabaseUtils.formatTime(row.averageRawTime)}
            </>,
        },

        {
            dataField: 'rankScore',
            isDummyField: true,
            text: '評価点',
            formatter: (cell, row) => {
                let properGroundLabel = '?';
                switch (this.state.groundType) {
                    case RaceInstance_GroundType.TURF:
                        properGroundLabel = UMDatabaseUtils.charaProperLabels[row.trainedChara.properGroundTurf];
                        break;
                    case RaceInstance_GroundType.DIRT:
                        properGroundLabel = UMDatabaseUtils.charaProperLabels[row.trainedChara.properGroundDirt];
                        break;
                }
                return <>
                    {row.trainedChara.rankScore}
                    <br/>
                    {properGroundLabel}
                    {' '}{this.state.distanceType ? UMDatabaseUtils.charaProperLabels[row.trainedChara.properDistances[this.state.distanceType]] : '?'}
                </>
            },
        },
        {
            dataField: 'speed',
            isDummyField: true,
            text: 'スピ',
            formatter: (cell, row) => row.trainedChara.speed,
        },
        {
            dataField: 'stamina',
            isDummyField: true,
            text: 'スタ',
            formatter: (cell, row) => row.trainedChara.stamina,
        },
        {
            dataField: 'pow',
            isDummyField: true,
            text: 'パワ',
            formatter: (cell, row) => row.trainedChara.pow,
        },
        {
            dataField: 'guts',
            isDummyField: true,
            text: '根性',
            formatter: (cell, row) => row.trainedChara.guts,
        },
        {
            dataField: 'wiz',
            isDummyField: true,
            text: '賢さ',
            formatter: (cell, row) => row.trainedChara.wiz,
        },
    ];


    onSelectedFilesChange(files: File[]) {
        if (files.length === 0) {
            return;
        }
        this.setState({
            selectedFiles: files,
            aggregatedCharaDatas: [],
            loading: true,
        }, () => {
            Promise.all(files.map(parse))
                .then(_.compact)
                .then((roomRaceDatas: RoomRaceData[]) => {
                    const distances = new Set(roomRaceDatas.map(d => d.raceInstance.distance!));
                    const distanceType = distances.size === 1 ? toDistanceType(distances.values().next().value) : undefined;
                    const groundTypes = new Set(roomRaceDatas.map(d => d.raceInstance.groundType!));
                    const groundType = groundTypes.size === 1 ? groundTypes.values().next().value : RaceInstance_GroundType.UNKNOWN_GROUND_TYPE;
                    const viewerIds = new Set(roomRaceDatas.map(d => d.viewerId));

                    function aggregate(datas: RoomRaceCharaData[], key: string): AggregatedCharaData {
                        return {
                            key: key,
                            viewerIdAtLeastOneMatches: viewerIds.has(datas[0].trainedChara.viewerId),

                            trainedChara: datas[0].trainedChara,
                            chara: UMDatabaseWrapper.charas[datas[0].trainedChara.charaId],

                            raceCount: datas.length,
                            finishOrders: _.countBy(datas, d => Math.min(d.finishOrder, 5)),
                            averageTime: _.meanBy(datas, d => d.finishTime),
                            averageRawTime: _.meanBy(datas, d => d.finishTimeRaw),

                            skillsActivationDistances: _.mapValues(_.groupBy(_.flatMap(datas, d => d.skillActivationDistances), e => e.skillId), es => es.map(e => e.activationDistance)),
                        }
                    }

                    const aggregations: AggregatedCharaData[] = _.map(_.groupBy(roomRaceDatas.map(d => d.charaDatas).flat(),
                            c => `${c.trainedChara.viewerId}:${c.trainedChara.trainedCharaId}:${distanceType}:${groundType}`),
                        aggregate);

                    this.setState({
                        loading: false,
                        aggregatedCharaDatas: aggregations,
                        distances: distances,
                        distanceType: distanceType,
                        groundType: groundType,
                    });
                })
        });
    }

    groundType() {
        switch (this.state.groundType) {
            case RaceInstance_GroundType.TURF:
                return '芝';
            case RaceInstance_GroundType.DIRT:
                return 'ダート';
        }
        return 'Unknown';
    }

    render() {
        return <>
            <Row>
                <Col>
                    <FilesSelector onFilesChange={files => this.onSelectedFilesChange(files)}
                                   instructions={<>
                                       Select Room Match / Practice packets. It is your responsibility to ensure that
                                       all packets are for similar races.
                                   </>}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Switch
                        checked={this.state.viewerOnly}
                        onChange={(e) => this.setState({viewerOnly: e.target.checked})}
                        id="viewer-only"
                        label="Show only TrainedCharas of viewer"/>
                </Col>
            </Row>

            <Row>
                <Col>
                    Distance: {_.join([...this.state.distances], ', ')}{' '}{this.groundType()}
                    {this.state.distances.size > 1 &&
                        <Alert variant="warning">Inconsistent Distances Detected!</Alert>}
                </Col>
            </Row>

            <Row>
                <Col>
                    <BootstrapTable bootstrap4 condensed hover
                                    classes="responsive-bootstrap-table"
                                    wrapperClasses="table-responsive"
                                    data={this.state.aggregatedCharaDatas.filter(d => d.viewerIdAtLeastOneMatches || !this.state.viewerOnly)}
                                    columns={this.aggregatedCharaDataColumns}
                                    keyField="key"
                                    expandRow={expandRow}
                                    noDataIndication={this.state.loading ? 'Loading...' : 'No data loaded'}/>
                </Col>
            </Row>
        </>;
    }
}

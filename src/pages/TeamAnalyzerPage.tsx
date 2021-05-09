import React from "react";
import {Col, Row} from "react-bootstrap";
import FilesSelector from "../components/FilesSelector";
import {CharaRaceData, parse} from "../data/TeamRaceParser";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import BootstrapTable, {ColumnDescription, ColumnFormatter} from 'react-bootstrap-table-next';
import _ from "lodash";
import {Chara} from "../data/data_pb";

type TeamAnalyzerPageState = {
    selectedFiles: File[],
    aggregations: AggregatedCharaData[],

    loading: boolean,
};

type AggregatedCharaData = {
    key: string,

    viewerId: number,
    trainedCharaId: number,
    distanceType: string,
    runningStyle: string,
    chara: Chara,

    raceCount: number,

    avgScore: number,
    sdScore: number,

    avgLastHp: number,
    zeroLastHpCount: number,

    avgStartDelayTime: number,

    avgLastSpurtStartDistance: number,
    noLastSpurtCount: number,
};

const floatFormatter: ColumnFormatter<AggregatedCharaData, {}, number> = (cell, row) => cell.toFixed(2);

const countFormatter: ColumnFormatter<AggregatedCharaData, {}, number> = (cell, row) => <>{cell}<br/>({(cell / row.raceCount * 100).toFixed(2)}%)</>;


const columns: ColumnDescription<AggregatedCharaData>[] = [
    {
        dataField: 'viewerId',
        text: 'ID',
        formatter: (cell, row) => <>{cell}<br/>TCID: {row.trainedCharaId}</>
    },

    {
        dataField: 'distanceType', text: '', sort: true, formatter: (cell, row) => <>
            {cell}
            <br/>{row.runningStyle}
        </>
    },
    {
        dataField: 'chara',
        text: '',
        formatter: (chara: Chara) => <>
            {chara.getId()} - {chara.getName()}
            <br/>({chara.getCastName()})
        </>
    },

    {dataField: 'raceCount', text: 'N'},

    {dataField: 'avgScore', text: 'μ(pts)', sort: true, formatter: floatFormatter},
    {dataField: 'sdScore', text: 'σ(pts)', sort: true, formatter: floatFormatter},

    {dataField: 'avgLastHp', text: 'μ(HP)', sort: true, formatter: floatFormatter},
    {dataField: 'zeroLastHpCount', text: 'C(HP0)', sort: true, formatter: countFormatter},

    {
        dataField: 'avgStartDelayTime',
        text: 'μ(出遅れ)',
        sort: true,
        formatter: (cell: number, row) => cell.toFixed(6)
    },

    {dataField: 'avgLastSpurtStartDistance', text: 'μ(LS)', sort: true, formatter: floatFormatter},
    {dataField: 'noLastSpurtCount', text: 'C(LS0)', sort: true, formatter: countFormatter},
];

function groupByKey(data: CharaRaceData): string {
    return [data.viewerId, data.trainedCharaId, data.distanceType, data.runningStyle].join(':');
}

export default class TeamAnalyzerPage extends React.Component<{}, TeamAnalyzerPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedFiles: [],
            aggregations: [],
            loading: false,
        };
    }

    onSelectedFilesChange(files: File[]) {
        if (files.length === 0) {
            return;
        }
        this.setState({selectedFiles: files, aggregations: [], loading: true}, () => {
            Promise.all(files.map(parse)).then(values => {
                const aggregations = _.map(_.groupBy(values.flat(), groupByKey), (datas, k) => {
                    const raceCount = datas.length;

                    const scores = datas.map(d => d.score);
                    const avgScore = _.mean(scores);

                    const lastHps = datas.map(d => d.lastHp);

                    const lastSpurtStartDistances = datas.map(d => d.lastSpurtStartDistance);

                    const aggregation: AggregatedCharaData = {
                        key: k,

                        viewerId: datas[0].viewerId,
                        trainedCharaId: datas[0].trainedCharaId,
                        distanceType: UMDatabaseUtils.teamRaceDistanceLabels[datas[0].distanceType],
                        runningStyle: UMDatabaseUtils.runningStyleLabels[datas[0].runningStyle],
                        chara: UMDatabaseWrapper.charas[datas[0].charaId],

                        raceCount: raceCount,

                        avgScore: avgScore,
                        sdScore: Math.sqrt(_.sum(scores.map(s => Math.pow(s - avgScore, 2))) / (raceCount - 1)),

                        avgLastHp: _.mean(lastHps),
                        zeroLastHpCount: lastHps.filter(i => i <= 0).length,

                        avgStartDelayTime: _.mean(datas.map(d => d.startDelayTime)),

                        avgLastSpurtStartDistance: _.mean(lastSpurtStartDistances.filter(d => d > 0)),
                        noLastSpurtCount: lastSpurtStartDistances.filter(d => d <= 0).length,
                    };

                    return aggregation;
                });

                this.setState({aggregations: aggregations, loading: false});
            });
        });
    }

    render() {
        return <div>
            <Row>
                <Col>
                    <FilesSelector onFilesChange={files => this.onSelectedFilesChange(files)}
                                   instructions="You can simply select all packets from CarrotJuicer directory - packets that are not team races will be ignored."/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <BootstrapTable bootstrap4 condensed striped hover
                                    data={this.state.aggregations} columns={columns} keyField="key"
                                    noDataIndication={this.state.loading ? 'Loading...' : 'No data loaded'}/>
                </Col>
            </Row>
        </div>
    }
}

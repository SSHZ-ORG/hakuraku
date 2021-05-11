import React from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import FilesSelector from "../components/FilesSelector";
import {CharaRaceData, parse} from "../data/TeamRaceParser";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import BootstrapTable, {ColumnDescription, ColumnFormatter} from 'react-bootstrap-table-next';
import _ from "lodash";
import {Chara, TeamStadiumScoreBonus} from "../data/data_pb";
import {Typeahead} from "react-bootstrap-typeahead";

type TeamAnalyzerPageState = {
    selectedFiles: File[],
    aggregations: AggregatedCharaData[],
    selectedBonuses: TeamStadiumScoreBonus[],

    loading: boolean,
};

type AggregatedCharaData = {
    key: string,

    viewerId: number,
    trainedCharaId: number,
    distanceType: number,
    runningStyle: number,
    chara: Chara,

    raceCount: number,
    finishOrders: Record<number, number>,

    displayScore: number,
    sdScore: number,

    avgScore: number,
    avgBonusScores: Record<number, number>,

    avgLastHp: number,
    zeroLastHpCount: number,

    avgStartDelayTime: number,

    avgLastSpurtDistancePercentage: number,
    noLastSpurtCount: number,

    avgZeroHpFrameCount: number,
    avgNonZeroTemptationFrameCount: number,
};

const floatFormatter: ColumnFormatter<AggregatedCharaData, {}, number> = (cell) => cell.toFixed(2);
const floatFormatter6: ColumnFormatter<AggregatedCharaData, {}, number> = (cell) => cell.toFixed(6);

const countFormatter: ColumnFormatter<AggregatedCharaData, {}, number> = (cell, row) => <>{cell}<br/>({(cell / row.raceCount * 100).toFixed(2)}%)</>;


const columns: ColumnDescription<AggregatedCharaData>[] = [
    {
        dataField: 'trainedCharaId',
        text: 'ID',
        sort: true,
        formatter: (cell, row) => <>{row.viewerId}<br/>TCID: {cell}</>
    },

    {
        dataField: 'distanceType',
        text: '',
        sort: true,
        formatter: (cell, row) => <>
            {UMDatabaseUtils.teamRaceDistanceLabels[cell]}
            <br/>{UMDatabaseUtils.runningStyleLabels[row.runningStyle]}
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
    {
        dataField: 'finishOrders',
        text: '',
        formatter: cell => `${cell[0] ?? 0}-${cell[1] ?? 0}-${cell[2] ?? 0}-${cell[3] ?? 0}`
    },

    {dataField: 'displayScore', text: 'μ(pts)', sort: true, formatter: floatFormatter},
    {dataField: 'sdScore', text: 'σ(Rpts)', sort: true, formatter: floatFormatter},

    {dataField: 'avgLastHp', text: 'μ(HP)', sort: true, formatter: floatFormatter},
    {dataField: 'zeroLastHpCount', text: 'C(HP0)', sort: true, formatter: countFormatter},
    {dataField: 'avgZeroHpFrameCount', text: 'μ(fHP0)', sort: true, formatter: floatFormatter6},

    {dataField: 'avgStartDelayTime', text: 'μ(出遅れ)', sort: true, formatter: floatFormatter6},

    {dataField: 'avgNonZeroTemptationFrameCount', text: 'μ(f掛かり)', sort: true, formatter: floatFormatter6},

    {dataField: 'avgLastSpurtDistancePercentage', text: 'μ(LS%)', sort: true, formatter: floatFormatter},
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
            selectedBonuses: [],
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

                    const scores = datas.map(d => d.rawScore);
                    const avgScore = _.mean(scores);

                    const lastHps = datas.map(d => d.lastHp);

                    const aggregation: AggregatedCharaData = {
                        key: k,

                        viewerId: datas[0].viewerId,
                        trainedCharaId: datas[0].trainedCharaId,
                        distanceType: datas[0].distanceType,
                        runningStyle: datas[0].runningStyle,
                        chara: UMDatabaseWrapper.charas[datas[0].charaId],

                        raceCount: raceCount,
                        finishOrders: _.countBy(datas, d => Math.min(d.finishOrder, 3)),

                        avgScore: avgScore,
                        sdScore: Math.sqrt(_.sum(scores.map(s => Math.pow(s - avgScore, 2))) / (raceCount - 1)),

                        displayScore: NaN,
                        avgBonusScores: _.mapValues(
                            _.reduce(datas.map(d => d.bonusScores), (result, value) => _.mergeWith(result, value, _.add)),
                            s => s / raceCount),

                        avgLastHp: _.mean(lastHps),
                        zeroLastHpCount: lastHps.filter(i => i <= 0).length,

                        avgStartDelayTime: _.mean(datas.map(d => d.startDelayTime)),

                        avgLastSpurtDistancePercentage: _.meanBy(datas.filter(d => d.lastSpurtDistanceRatio > 0), d => d.lastSpurtDistanceRatio) * 100,
                        noLastSpurtCount: datas.filter(d => d.lastSpurtDistanceRatio <= 0).length,

                        avgZeroHpFrameCount: _.meanBy(datas, d => d.zeroHpFrameCount),
                        avgNonZeroTemptationFrameCount: _.meanBy(datas, d => d.nonZeroTemptationFrameCount),
                    };

                    return aggregation;
                });

                this.setState({aggregations: aggregations, loading: false});
            });
        });
    }

    patchedAggregations() {
        const r = _.cloneDeep(this.state.aggregations);
        r.forEach(aggregation => {
            aggregation.displayScore = aggregation.avgScore + _.sum(this.state.selectedBonuses.map(b => aggregation.avgBonusScores[b.getId()!] ?? 0));
        });
        return r;
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
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Included Bonuses
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Typeahead labelKey={(b) => `${b.getId()} - ${b.getName()}`}
                                       multiple
                                       options={UMDatabaseWrapper.umdb.getTeamStadiumScoreBonusList()}
                                       selected={this.state.selectedBonuses}
                                       onChange={s => this.setState({selectedBonuses: s})}/>
                            <InputGroup.Append>
                                <Button variant="outline-secondary"
                                        onClick={() => this.setState({selectedBonuses: UMDatabaseWrapper.umdb.getTeamStadiumScoreBonusList()})}>
                                    All
                                </Button>{' '}
                                <Button variant="outline-secondary"
                                        onClick={() => this.setState({selectedBonuses: []})}>
                                    No
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <BootstrapTable bootstrap4 condensed striped hover
                                    id="team-race-analyzer-table"
                                    wrapperClasses="table-responsive"
                                    data={this.patchedAggregations()} columns={columns} keyField="key"
                                    noDataIndication={this.state.loading ? 'Loading...' : 'No data loaded'}/>
                </Col>
            </Row>
        </div>
    }
}

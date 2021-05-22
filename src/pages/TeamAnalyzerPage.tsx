import React from "react";
import {Button, Col, Form, InputGroup, Row, Table} from "react-bootstrap";
import FilesSelector from "../components/FilesSelector";
import {CharaRaceData, parse, TeamRaceGroupData} from "../data/TeamRaceParser";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import BootstrapTable, {ColumnDescription, ColumnFormatter, ExpandRowProps} from 'react-bootstrap-table-next';
import _ from "lodash";
import {Chara, TeamStadiumScoreBonus} from "../data/data_pb";
import {Typeahead} from "react-bootstrap-typeahead";
import {TrainedCharaData} from "../data/TrainedCharaData";

type TeamAnalyzerPageState = {
    selectedFiles: File[],

    lastGroupCharaKeys: Set<string>,
    aggregations: AggregatedCharaData[],
    selectedBonuses: TeamStadiumScoreBonus[],

    loading: boolean,
};

type AggregatedCharaData = {
    key: string,

    trainedChara: TrainedCharaData,
    trainedCharaId: number,
    distanceType: keyof typeof UMDatabaseUtils.teamRaceDistanceLabels,
    runningStyle: keyof typeof UMDatabaseUtils.runningStyleLabels,
    chara: Chara,

    raceCount: number,
    finishOrders: Record<number, number>,

    displayScore: number,
    sdScore: number,
    avgRawScoreDevRatio: number,

    avgScore: number,
    avgBonusScores: Record<number, number>,

    avgLastHp: number,
    zeroLastHpCount: number,

    avgStartDelayTime: number,

    avgLastSpurtDistancePercentage: number,
    noLastSpurtCount: number,

    avgZeroHpFrameCount: number,
    avgNonZeroTemptationFrameCount: number,

    skillActivationCount: Record<number, number>,
};

const floatFormatter: ColumnFormatter<AggregatedCharaData, {}, number> = (cell) => cell.toFixed(2);
const floatFormatter6: ColumnFormatter<AggregatedCharaData, {}, number> = (cell) => cell.toFixed(6);

const countFormatter: ColumnFormatter<AggregatedCharaData, {}, number> = (cell, row) => <>{cell}<br/>({(cell / row.raceCount * 100).toFixed(2)}%)</>;


const columns: ColumnDescription<AggregatedCharaData>[] = [
    {
        dataField: 'trainedCharaId',
        text: 'ID',
        sort: true,
        formatter: (cell, row) => <>{row.trainedChara.viewerId}<br/>TCID: {cell}</>
    },

    {
        dataField: 'distanceType',
        text: '',
        sort: true,
        formatter: (cell: keyof typeof UMDatabaseUtils.teamRaceDistanceLabels, row) => <>
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

    {
        dataField: 'displayScore',
        text: 'μ(pts)',
        sort: true,
        formatter: floatFormatter,
        // @ts-ignore
        headerAttrs: {title: '(Estimated) average score, including selected bonuses'},
    },
    {
        dataField: 'sdScore',
        text: 'σ(Rpts)',
        sort: true,
        formatter: floatFormatter,
        // @ts-ignore
        headerAttrs: {title: '(Estimated) standard deviation of raw score, excluding bonuses'},
    },
    {
        dataField: 'avgRawScoreDevRatio',
        text: 'μ(D%Rpts)',
        sort: true,
        formatter: cell => `${(cell * 100).toFixed(2)}%`,
        // @ts-ignore
        headerAttrs: {title: 'Average of deviation rate of raw score from all charas\' score in each group of races'},
    },

    {
        dataField: 'avgLastHp',
        text: 'μ(HP)',
        sort: true,
        formatter: floatFormatter,
        // @ts-ignore
        headerAttrs: {title: 'Average HP remaining at the last frame, including 0'},
    },
    {
        dataField: 'zeroLastHpCount',
        text: 'C(HP0)',
        sort: true,
        formatter: countFormatter,
        // @ts-ignore
        headerAttrs: {title: 'Number of races where HP is 0 at the last frame'},
    },
    {
        dataField: 'avgZeroHpFrameCount',
        text: 'μ(fHP0)',
        sort: true,
        formatter: floatFormatter6,
        // @ts-ignore
        headerAttrs: {title: 'Average number of frames before goal-in where HP is 0'},
    },

    {
        dataField: 'avgStartDelayTime',
        text: 'μ(出遅れ)',
        sort: true,
        formatter: floatFormatter6,
        // @ts-ignore
        headerAttrs: {title: 'Average time of 出遅れ, in seconds'},
    },

    {
        dataField: 'avgNonZeroTemptationFrameCount',
        text: 'μ(f掛かり)',
        sort: true,
        formatter: floatFormatter6,
        // @ts-ignore
        headerAttrs: {title: 'Average number of frames of 掛かり'},
    },

    {
        dataField: 'avgLastSpurtDistancePercentage',
        text: 'μ(LS%)',
        sort: true,
        formatter: floatFormatter6,
        // @ts-ignore
        headerAttrs: {title: 'Average percentage of last spurt distance of race distance, excluding races where no last spurt was attempted'},
    },
    {
        dataField: 'noLastSpurtCount',
        text: 'C(LS0)',
        sort: true,
        formatter: countFormatter,
        // @ts-ignore
        headerAttrs: {title: 'Number of races where no last spurt was attempted'},
    },
];

const expandRow: ExpandRowProps<AggregatedCharaData> = {
    renderer: row => (
        <div className="d-flex flex-row">
            <Table size="small" className="w-auto m-2">
                <tbody>
                {row.trainedChara.skills.map(cs =>
                    <tr>
                        <td>{UMDatabaseWrapper.skills[cs.skillId].getName()}</td>
                        <td>Lv {cs.level}</td>
                        <td>{row.skillActivationCount[cs.skillId] ?? 0}</td>
                        <td>({(100 * (row.skillActivationCount[cs.skillId] ?? 0) / row.raceCount).toFixed(2)}%)</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Table size="small" className="w-auto m-2">
                <tbody>
                <tr>
                    <td>スピ</td>
                    <td>{row.trainedChara.speed}</td>
                </tr>
                <tr>
                    <td>スタ</td>
                    <td>{row.trainedChara.stamina}</td>
                </tr>
                <tr>
                    <td>パワ</td>
                    <td>{row.trainedChara.pow}</td>
                </tr>
                <tr>
                    <td>根性</td>
                    <td>{row.trainedChara.guts}</td>
                </tr>
                <tr>
                    <td>賢さ</td>
                    <td>{row.trainedChara.wiz}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    ),
    showExpandColumn: true,
};

function groupByKey(data: CharaRaceData): string {
    return [data.trainedChara.viewerId, data.trainedChara.trainedCharaId, data.distanceType, data.runningStyle].join(':');
}

function aggregateChara(datas: CharaRaceData[], key: string): AggregatedCharaData {
    const raceCount = datas.length;

    const scores = datas.map(d => d.rawScore);
    const avgScore = _.mean(scores);

    const lastHps = datas.map(d => d.lastHp);

    return {
        key: key,

        trainedChara: datas[0].trainedChara,
        trainedCharaId: datas[0].trainedChara.trainedCharaId,
        distanceType: datas[0].distanceType,
        runningStyle: datas[0].runningStyle,
        chara: UMDatabaseWrapper.charas[datas[0].trainedChara.charaId],

        raceCount: raceCount,
        finishOrders: _.countBy(datas, d => Math.min(d.finishOrder, 3)),

        avgScore: avgScore,
        sdScore: Math.sqrt(_.sum(scores.map(s => Math.pow(s - avgScore, 2))) / (raceCount - 1)),
        avgRawScoreDevRatio: _.meanBy(datas, d => d.rawScoreDevRatio),

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

        skillActivationCount: _.countBy(datas.map(d => Array.from(d.activatedSkillIds)).flat()),
    };
}

export default class TeamAnalyzerPage extends React.Component<{}, TeamAnalyzerPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedFiles: [],
            lastGroupCharaKeys: new Set(),
            aggregations: [],
            selectedBonuses: [],
            loading: false,
        };
    }

    rowClasses(row: AggregatedCharaData) {
        if (this.state.lastGroupCharaKeys.has(row.key)) {
            return 'table-info';
        }
        return '';
    }

    onSelectedFilesChange(files: File[]) {
        if (files.length === 0) {
            return;
        }
        this.setState({selectedFiles: files, lastGroupCharaKeys: new Set(), aggregations: [], loading: true}, () => {
            Promise.all(files.map(parse))
                .then(_.compact)
                .then((teamRaceGroupDatas: TeamRaceGroupData[]) => {
                    const lastGroupCharaKeys = _.maxBy(teamRaceGroupDatas, d => d.timestamp)?.charaRaceDatas.map(c => groupByKey(c));

                    const aggregations = _.map(_.groupBy(teamRaceGroupDatas.map(g => g.charaRaceDatas).flat(), groupByKey), aggregateChara);

                    this.setState({
                        lastGroupCharaKeys: new Set(lastGroupCharaKeys ?? []),
                        aggregations: aggregations,
                        loading: false
                    });
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
                    <BootstrapTable bootstrap4 condensed hover
                                    classes="responsive-bootstrap-table"
                                    wrapperClasses="table-responsive"
                                    data={this.patchedAggregations()} columns={columns} keyField="key"
                                    expandRow={expandRow}
                                    rowClasses={r => this.rowClasses(r)}
                                    noDataIndication={this.state.loading ? 'Loading...' : 'No data loaded'}/>
                </Col>
            </Row>
        </div>
    }
}

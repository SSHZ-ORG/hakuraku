import {RaceSimulateData, RaceSimulateHorseResultData} from "../data/race_data_pb";
import React from "react";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import {Form, Table} from "react-bootstrap";
import memoize from "memoize-one";
import HighchartsReact from "highcharts-react-official";
import Highcharts, {PointOptionsObject, SeriesSplineOptions} from 'highcharts';
import ReactJson from "react-json-view";
import _ from "lodash";
import FoldCard from "./FoldCard";
import {fromRaceHorseData, TrainedCharaData} from "../data/TrainedCharaData";
import {Chara} from "../data/data_pb";
import BootstrapTable, {ColumnDescription, ExpandRowProps} from "react-bootstrap-table-next";
import {filterCharaSkills, filterCharaTargetedSkills, getCharaActivatedSkillIds} from "../data/RaceDataUtils";
import CopyButton from "./CopyButton";

const unknownCharaTag = 'Unknown Chara / Mob';

type CharaTableData = {
    trainedChara: TrainedCharaData,
    chara: Chara | undefined, // Mob or unknown chara will be undefined.

    frameOrder: number, // 馬番, 1-indexed
    finishOrder: number, // 着順, 1-indexed

    horseResultData: RaceSimulateHorseResultData,

    popularity: number,
    popularityMarks: number[],
    motivation: number,

    activatedSkills: Set<number>,
};

function formatTime(time: number): string {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec.toFixed(4)}`;
}

const charaTableColumns: ColumnDescription<CharaTableData>[] = [
    {
        dataField: 'copy',
        isDummyField: true,
        text: '',
        formatter: (cell, row) => <CopyButton content={JSON.stringify(row.trainedChara.rawData)}/>,
    },

    {
        dataField: 'finishOrder',
        text: '着',
        sort: true,
    },
    {
        dataField: 'frameOrder',
        text: '番',
        sort: true,
    },

    {
        dataField: 'chara',
        text: '',
        formatter: (chara: Chara | undefined) => chara ? <>
            {chara.getId()} - {chara.getName()}
            <br/>({chara.getCastName()})
        </> : unknownCharaTag,
    },

    {
        dataField: 'df1',
        isDummyField: true,
        text: 'ト',
        formatter: (cell, row) => row.trainedChara.viewerId ? row.trainedChara.viewerName : '',
    },
    {
        dataField: 'df2',
        isDummyField: true,
        text: 'Time',
        formatter: (cell, row) => <>
            {formatTime(row.horseResultData.getFinishTime()!)}
            <br/>{formatTime(row.horseResultData.getFinishTimeRaw()!)}
        </>,
    },
    {
        dataField: 'df3',
        isDummyField: true,
        text: '',
        formatter: (cell, row) => <>
            {UMDatabaseUtils.runningStyleLabels[row.horseResultData.getRunningStyle()!]}
            <br/>{UMDatabaseUtils.motivationLabels[row.motivation]}
        </>,
    },
    {
        dataField: 'popularity',
        text: '人気',
        sort: true,
        formatter: (cell, row) => <>
            {cell}<br/>{row.popularityMarks.map(UMDatabaseUtils.getPopularityMark).join(', ')}
        </>,
    },

    {
        dataField: 'rankPoints',
        isDummyField: true,
        text: '評価点',
        formatter: (cell, row) => row.trainedChara.rankPoints,
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

const charaTableExpandRow: ExpandRowProps<CharaTableData> = {
    renderer: row => <div className="d-flex flex-row">
        <Table size="small" className="w-auto m-2">
            <tbody>
            {row.trainedChara.skills.map(cs =>
                <tr>
                    <td>{UMDatabaseWrapper.skillName(cs.skillId)}</td>
                    <td>Lv {cs.level}</td>
                    <td>{row.activatedSkills.has(cs.skillId) ? '発動' : ''}</td>
                </tr>
            )}
            </tbody>
        </Table>
    </div>,
    showExpandColumn: true,
}

type RaceDataPresenterProps = {
    raceHorseInfo: any[],
    raceData: RaceSimulateData,
};

type RaceDataPresenterState = {
    selectedCharaFrameOrder: number | undefined,

    showSkills: boolean,
    showTargetedSkills: boolean,
    showBlocks: boolean,
    showTemptationMode: boolean,

    diffGraphUseDistanceAsXAxis: boolean,
};

class RaceDataPresenter extends React.PureComponent<RaceDataPresenterProps, RaceDataPresenterState> {
    constructor(props: RaceDataPresenterProps) {
        super(props);

        this.state = {
            selectedCharaFrameOrder: undefined,

            showSkills: true,
            showTargetedSkills: true,
            showBlocks: true,
            showTemptationMode: true,

            diffGraphUseDistanceAsXAxis: false,
        };
    }

    displayNames = memoize((raceHorseInfo: any[], raceData: RaceSimulateData) => {
        const nameFromRaceHorseInfo: Record<number, string> = {};
        if (raceHorseInfo && raceHorseInfo.length === raceData.getHorseResultList().length) {
            raceHorseInfo.forEach((d: any) => {
                const frameOrder = d['frame_order'] - 1; // 0-indexed
                const charaId = d['chara_id'];
                const charaDisplayName = charaId in UMDatabaseWrapper.charas ? UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[charaId]) : unknownCharaTag;
                const trainerNameSuffix = d['trainer_name'] ? ` [Trainer: ${d['trainer_name']}]` : '';
                nameFromRaceHorseInfo[frameOrder] = ` ${charaDisplayName}${trainerNameSuffix}`;
            });
        }

        const m: Record<number, string> = {};
        for (let frameOrder = 0; frameOrder < raceData.getHorseResultList().length; frameOrder++) {
            // frameOrder is 0 ordered.
            const finishOrder = raceData.getHorseResultList()[frameOrder].getFinishOrder()! + 1; // 1-indexed
            m[frameOrder] = `[${frameOrder + 1} 番 ${finishOrder} 着]${nameFromRaceHorseInfo[frameOrder] ?? ''}`;
        }
        return m;
    });

    renderGraphs() {
        const raceHorseInfo = this.props.raceHorseInfo;
        const raceData = this.props.raceData;
        const frameOrder = this.state.selectedCharaFrameOrder!;

        const displayNames = this.displayNames(raceHorseInfo, raceData);

        const skillPlotLines = filterCharaSkills(raceData, frameOrder)
            .map(event => {
                return {
                    value: event.getFrameTime(),
                    label: {text: UMDatabaseWrapper.skillName(event.getParamList()[1])},
                    zIndex: 3,
                };
            });

        const skillTargetedSkillPlotLines = filterCharaTargetedSkills(raceData, frameOrder)
            .map(event => {
                return {
                    value: event.getFrameTime(),
                    label: {text: `${UMDatabaseWrapper.skillName(event.getParamList()[1])} by ${displayNames[event.getParamList()[0]]}`},
                    color: 'rgba(255, 0, 0, 0.6)',
                    zIndex: 3,
                };
            })

        const lastSpurtStartDistance = raceData.getHorseResultList()[frameOrder].getLastSpurtStartDistance()!;
        let lastSpurtStartTime = 0;

        function makeBlockedPlotArea(from: number, to: number, blockedByIndex: number): Highcharts.XAxisPlotBandsOptions {
            return {
                color: 'rgba(255, 0, 0, 0.1)',
                from: from,
                to: to,
                label: {
                    text: `Blocked by ${displayNames[blockedByIndex]}`,
                    rotation: 90,
                    verticalAlign: "middle",
                },
                zIndex: 2,
            };
        }

        function makeTemptationModePlotArea(from: number, to: number, mode: number): Highcharts.XAxisPlotBandsOptions {
            return {
                color: 'rgba(255, 255, 0, 0.1)',
                from: from,
                to: to,
                label: {
                    text: `Temptation mode ${mode}`,
                    rotation: 90,
                    verticalAlign: "bottom",
                },
                zIndex: 1,
            };
        }

        const blockFrontPlotAreas: Highcharts.XAxisPlotBandsOptions[] = [];
        const temptationModePlotAreas: Highcharts.XAxisPlotBandsOptions[] = [];

        const deltaSpeed = [];
        const deltaHp = [];

        let lastBlockFrontHorseIndexChangedTime = 0;
        let lastBlockFrontHorseIndex = -1;
        let lastTemptationModeChangedTime = 0;
        let lastTemptationMode = 0;
        for (let i = 0; i < raceData.getFrameList().length; i++) {
            const frame = raceData.getFrameList()[i];
            const time = frame.getTime()!;
            const horseFrame = frame.getHorseFrameList()[frameOrder];

            const previousFrame = raceData.getFrameList()[i - 1];
            const previousTime = i === 0 ? 0 : previousFrame.getTime()!;
            const previousHorseFrame = previousFrame?.getHorseFrameList()[frameOrder];

            if (horseFrame.getBlockFrontHorseIndex() !== lastBlockFrontHorseIndex) {
                if (lastBlockFrontHorseIndex !== -1) {
                    blockFrontPlotAreas.push(makeBlockedPlotArea(lastBlockFrontHorseIndexChangedTime, previousTime, lastBlockFrontHorseIndex));
                }
                lastBlockFrontHorseIndexChangedTime = previousTime;
                lastBlockFrontHorseIndex = horseFrame.getBlockFrontHorseIndex()!;
            }
            if (horseFrame.getTemptationMode() !== lastTemptationMode) {
                if (lastTemptationMode !== 0) {
                    temptationModePlotAreas.push(makeTemptationModePlotArea(lastTemptationModeChangedTime, previousTime, lastTemptationMode));
                }
                lastTemptationModeChangedTime = previousTime;
                lastTemptationMode = horseFrame.getTemptationMode()!;
            }

            const distance = horseFrame.getDistance()!;
            if (lastSpurtStartDistance > 0 && lastSpurtStartTime === 0 && lastSpurtStartDistance <= distance) {
                // i should never be 0 unless it has > 0 distance at frame 0, but just in case...
                if (i > 0) {
                    // Interpolate it.
                    const previousFrameDistance = previousHorseFrame.getDistance()!;
                    lastSpurtStartTime = previousTime + (lastSpurtStartDistance - previousFrameDistance) / (distance - previousFrameDistance) * (time - previousTime);
                }
            }

            if (i === 0) {
                deltaSpeed.push({x: 0, y: 0});
                deltaHp.push({x: 0, y: 0});
            } else {
                deltaSpeed.push({x: time, y: horseFrame.getSpeed()! - previousHorseFrame.getSpeed()!});
                deltaHp.push({x: time, y: horseFrame.getHp()! - previousHorseFrame.getHp()!});
            }
        }
        const lastFrameTime = _.last(raceData.getFrameList())!.getTime()!;
        if (lastBlockFrontHorseIndex !== -1) {
            blockFrontPlotAreas.push(makeBlockedPlotArea(lastBlockFrontHorseIndexChangedTime, lastFrameTime, lastBlockFrontHorseIndex));
        }
        if (lastTemptationMode !== 0) {
            temptationModePlotAreas.push(makeTemptationModePlotArea(lastTemptationModeChangedTime, lastFrameTime, lastTemptationMode));
        }

        const plotLines = [{
            value: raceData.getHorseResultList()[frameOrder!].getFinishTimeRaw(),
            dashStyle: 'LongDashDot',
            label: {text: 'Goal in'},
            zIndex: 20,
        }];
        if (lastSpurtStartDistance > 0) {
            plotLines.push({
                value: lastSpurtStartTime,
                dashStyle: 'LongDash',
                label: {text: `Last Spurt`},
                zIndex: 0,
            });
        }

        const options1: Highcharts.Options = {
            title: {text: undefined},
            credits: {enabled: false},
            xAxis: {
                title: {text: "Time"},
                plotLines: [
                    ...(this.state.showSkills ? skillPlotLines : []),
                    ...(this.state.showTargetedSkills ? skillTargetedSkillPlotLines : []),
                    ...plotLines,
                ],
                plotBands: [
                    ...(this.state.showBlocks ? blockFrontPlotAreas : []),
                    ...(this.state.showTemptationMode ? temptationModePlotAreas : []),
                ],
            },
            yAxis: {title: {text: undefined}},
            series: [
                {
                    name: "Speed",
                    data: raceData.getFrameList().map(frame => {
                        return {
                            x: frame.getTime(),
                            y: frame.getHorseFrameList()[frameOrder!].getSpeed(),
                        }
                    }),
                    type: "spline",
                }, {
                    name: "HP",
                    data: raceData.getFrameList().map(frame => {
                        return {
                            x: frame.getTime(),
                            y: frame.getHorseFrameList()[frameOrder!].getHp(),
                        }
                    }),
                    type: "spline",
                },
            ],
            tooltip: {shared: true},
            chart: {zoomType: "x"},
        };

        const options2: Highcharts.Options = {
            chart: {height: "300px", zoomType: "x"},
            title: {text: undefined},
            credits: {enabled: false},
            xAxis: {
                title: {text: "Time"},
            },
            yAxis: {title: {text: undefined}},
            series: [
                {
                    name: "ΔSpeed",
                    data: deltaSpeed,
                    type: "spline",
                }, {
                    name: "ΔHP",
                    data: deltaHp,
                    type: "spline",
                },
            ],
            tooltip: {shared: true},
        };

        return <div>
            <HighchartsReact highcharts={Highcharts} options={options1}/>
            <HighchartsReact highcharts={Highcharts} options={options2}/>
        </div>;
    }

    renderCharaList() {
        if (!this.props.raceHorseInfo || this.props.raceHorseInfo.length === 0) {
            return undefined;
        }

        const l: CharaTableData[] = this.props.raceHorseInfo.map(data => {
            const frameOrder = data['frame_order'] - 1;

            const horseResult = this.props.raceData.getHorseResultList()[frameOrder];

            const trainedCharaData = fromRaceHorseData(data);
            return {
                trainedChara: trainedCharaData,
                chara: UMDatabaseWrapper.charas[trainedCharaData.charaId],

                frameOrder: frameOrder + 1,
                finishOrder: horseResult.getFinishOrder()! + 1,

                horseResultData: horseResult,

                popularity: data['popularity'],
                popularityMarks: data['popularity_mark_rank_array'],
                motivation: data['motivation'],

                activatedSkills: getCharaActivatedSkillIds(this.props.raceData, frameOrder),
            };
        });

        return <FoldCard header='出馬表'>
            <BootstrapTable bootstrap4 condensed hover
                            classes="responsive-bootstrap-table"
                            wrapperClasses="table-responsive"
                            expandRow={charaTableExpandRow}
                            data={_.sortBy(l, d => d.finishOrder)} columns={charaTableColumns} keyField="frameOrder"/>
        </FoldCard>
    }


    renderGlobalRaceDistanceDiffGraph() {
        const series: Record<number, SeriesSplineOptions> = _.mapValues(this.displayNames(this.props.raceHorseInfo, this.props.raceData), name => {
            return {
                name: name,
                data: [] as PointOptionsObject[],
                type: 'spline',
            } as SeriesSplineOptions;
        });

        this.props.raceData.getFrameList().forEach(frame => {
            const time = frame.getTime()!;

            const minDistance = _.min(frame.getHorseFrameList().map(horseFrame => horseFrame.getDistance()!))!;
            const maxDistance = _.max(frame.getHorseFrameList().map(horseFrame => horseFrame.getDistance()!))!;
            const baseDistance = (minDistance + maxDistance) / 2;

            frame.getHorseFrameList().forEach((horseFrame, frameOrder) => {
                series[frameOrder].data!.push({
                    x: this.state.diffGraphUseDistanceAsXAxis ? baseDistance : time,
                    y: (horseFrame.getDistance()! - baseDistance),
                });
            });
        });

        const options: Highcharts.Options = {
            chart: {zoomType: "xy"},
            title: {text: undefined},
            credits: {enabled: false},
            xAxis: {
                title: {text: this.state.diffGraphUseDistanceAsXAxis ? "Base Distance" : "Time"},
            },
            yAxis: {title: {text: undefined}},
            series: _.values(series),
            tooltip: {shared: true},
        };

        return <FoldCard header='Distance Diff Graph'>
            <Form.Switch
                checked={this.state.diffGraphUseDistanceAsXAxis}
                onChange={(e) => this.setState({diffGraphUseDistanceAsXAxis: e.target.checked})}
                id="diff-graph-use-distance-as-x-axis"
                label="Use Base Distance as X Axis"/>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </FoldCard>
    }


    render() {
        return <div>
            {this.renderCharaList()}
            {this.renderGlobalRaceDistanceDiffGraph()}
            <Form>
                <Form.Group>
                    <Form.Label>Chara</Form.Label>
                    <Form.Control as="select" custom
                                  onChange={(e) => this.setState({selectedCharaFrameOrder: e.target.value ? parseInt(e.target.value) : undefined})}>
                        <option value="">-</option>
                        {Object.entries(this.displayNames(this.props.raceHorseInfo, this.props.raceData))
                            .map(([frameOrder, displayName]) => {
                                return <option value={frameOrder}>{displayName}</option>
                            })}
                    </Form.Control>
                    <Form.Switch
                        checked={this.state.showSkills}
                        onChange={(e) => this.setState({showSkills: e.target.checked})}
                        id="show-skills"
                        label="Show Skills"/>
                    <Form.Switch
                        checked={this.state.showTargetedSkills}
                        onChange={(e) => this.setState({showTargetedSkills: e.target.checked})}
                        id="show-targeted-skills"
                        label="Show Targeted Skills"/>
                    <Form.Switch
                        checked={this.state.showBlocks}
                        onChange={(e) => this.setState({showBlocks: e.target.checked})}
                        id="show-blocks"
                        label="Show Blocks"/>
                    <Form.Switch
                        checked={this.state.showTemptationMode}
                        onChange={(e) => this.setState({showTemptationMode: e.target.checked})}
                        id="show-temptation-mode"
                        label="Show Temptation Mode"/>
                </Form.Group>
            </Form>
            {this.state.selectedCharaFrameOrder !== undefined && this.renderGraphs()}
            <hr/>
            <ReactJson src={this.props.raceData.toObject()} collapsed={1}/>
        </div>;
    }
}

export default RaceDataPresenter;
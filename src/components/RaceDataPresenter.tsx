import Highcharts, {PointOptionsObject, SeriesSplineOptions} from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import memoize from "memoize-one";
import React from "react";
import {Alert, Form, Table} from "react-bootstrap";
import BootstrapTable, {ColumnDescription, ExpandRowProps} from "react-bootstrap-table-next";
import {Chara} from "../data/data_pb";
import {
    RaceSimulateData,
    RaceSimulateEventData_SimulateEventType,
    RaceSimulateHorseFrameData_TemptationMode,
    RaceSimulateHorseResultData
} from "../data/race_data_pb";
import {
    filterCharaSkills,
    filterCharaTargetedSkills,
    filterRaceEvents,
    getCharaActivatedSkillIds
} from "../data/RaceDataUtils";
import {fromRaceHorseData, TrainedCharaData} from "../data/TrainedCharaData";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import CardNamePresenter from "./CardNamePresenter";
import CharaProperLabels from "./CharaProperLabels";
import CopyButton from "./CopyButton";
import FoldCard from "./FoldCard";
import {JsonViewer} from "@textea/json-viewer";

const unknownCharaTag = 'Unknown Chara / Mob';
const supportedRaceDataVersion = 100000002;

type CompeteTableData = {
    time: number,
    type: string,
    charas: {
        displayName: string,
    }[],
};

const competeTableColumns: ColumnDescription<CompeteTableData> [] = [
    {
        dataField: 'time',
        text: 'Time',
    },
    {
        dataField: 'type',
        text: 'Type',
    },
    {
        dataField: 'charas',
        text: '',
        formatter: (_, row) => <>
            {row.charas.map(c => <>{c.displayName}<br/></>)}
        </>,
    },
];

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

const runningStyleLabel = (horseResultData: RaceSimulateHorseResultData, activatedSkills: Set<number>) => {
    if (activatedSkills.has(202051)) {
        return '大逃げ';
    }
    return UMDatabaseUtils.runningStyleLabels[horseResultData.runningStyle!];
};

const otherRaceEventLabels = new Map([
    [RaceSimulateEventData_SimulateEventType.COMPETE_TOP, '位置取り争い'],
    [RaceSimulateEventData_SimulateEventType.COMPETE_FIGHT, '追い比べ'],
    [RaceSimulateEventData_SimulateEventType.RELEASE_CONSERVE_POWER, '脚色十分'],
]);

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
        formatter: (chara: Chara | undefined, row) => chara ? <>
            {chara.id} - {chara.name}
            <br/>({chara.castName}){' '}<CardNamePresenter cardId={row.trainedChara.cardId}/>
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
            {UMDatabaseUtils.formatTime(row.horseResultData.finishTime!)}
            <br/>{UMDatabaseUtils.formatTime(row.horseResultData.finishTimeRaw!)}
        </>,
    },
    {
        dataField: 'df3',
        isDummyField: true,
        text: '',
        formatter: (cell, row) => <>
            {runningStyleLabel(row.horseResultData, row.activatedSkills)}
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
        dataField: 'rankScore',
        isDummyField: true,
        text: '評価点',
        formatter: (cell, row) => row.trainedChara.rankScore,
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
    renderer: row => <div className="d-flex flex-row align-items-start">
        <Table size="small" className="w-auto m-2">
            <tbody>
            {row.trainedChara.skills.map(cs =>
                <tr>
                    <td>{UMDatabaseWrapper.skillNameWithId(cs.skillId)}</td>
                    <td>Lv {cs.level}</td>
                    <td>{row.activatedSkills.has(cs.skillId) ? '発動' : ''}</td>
                </tr>
            )}
            </tbody>
        </Table>
        <CharaProperLabels chara={row.trainedChara}/>
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
    showOtherRaceEvents: boolean,

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
            showOtherRaceEvents: true,

            diffGraphUseDistanceAsXAxis: true,
        };
    }

    displayNames = memoize((raceHorseInfo: any[], raceData: RaceSimulateData) => {
        const nameFromRaceHorseInfo: Record<number, string> = {};
        if (raceHorseInfo && raceHorseInfo.length === raceData.horseResult.length) {
            raceHorseInfo.forEach((d: any) => {
                const frameOrder = d['frame_order'] - 1; // 0-indexed
                const charaId = d['chara_id'];
                const charaDisplayName = charaId in UMDatabaseWrapper.charas ? UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[charaId]) : unknownCharaTag;
                const trainerNameSuffix = d['trainer_name'] ? ` [Trainer: ${d['trainer_name']}]` : '';
                nameFromRaceHorseInfo[frameOrder] = ` ${charaDisplayName}${trainerNameSuffix}`;
            });
        }

        const m: Record<number, string> = {};
        for (let frameOrder = 0; frameOrder < raceData.horseResult.length; frameOrder++) {
            // frameOrder is 0 ordered.
            const finishOrder = raceData.horseResult[frameOrder].finishOrder! + 1; // 1-indexed
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
                    value: event.frameTime,
                    label: {text: UMDatabaseWrapper.skillName(event.param[1])},
                    zIndex: 3,
                };
            });

        const skillTargetedSkillPlotLines = filterCharaTargetedSkills(raceData, frameOrder)
            .map(event => {
                return {
                    value: event.frameTime,
                    label: {text: `${UMDatabaseWrapper.skillName(event.param[1])} by ${displayNames[event.param[0]]}`},
                    color: 'rgba(255, 0, 0, 0.6)',
                    zIndex: 3,
                };
            });

        const otherEventsPlotLines = Array.from(otherRaceEventLabels).flatMap(([eventType, name]) =>
            filterRaceEvents(raceData, frameOrder, eventType).map(event => {
                return {
                    value: event.frameTime,
                    label: {text: name},
                    color: 'rgba(0, 255, 0, 0.6)',
                    zIndex: 3,
                };
            }));

        const lastSpurtStartDistance = raceData.horseResult[frameOrder].lastSpurtStartDistance!;
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

        function makeTemptationModePlotArea(from: number, to: number, mode: RaceSimulateHorseFrameData_TemptationMode): Highcharts.XAxisPlotBandsOptions {
            return {
                color: 'rgba(255, 255, 0, 0.1)',
                from: from,
                to: to,
                label: {
                    text: `Temptation ${RaceSimulateHorseFrameData_TemptationMode[mode] ?? mode}`,
                    rotation: 90,
                    verticalAlign: "middle",
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
        for (let i = 0; i < raceData.frame.length; i++) {
            const frame = raceData.frame[i];
            const time = frame.time!;
            const horseFrame = frame.horseFrame[frameOrder];

            const previousFrame = raceData.frame[i - 1];
            const previousTime = i === 0 ? 0 : previousFrame.time!;
            const previousHorseFrame = previousFrame?.horseFrame[frameOrder];

            if (horseFrame.blockFrontHorseIndex !== lastBlockFrontHorseIndex) {
                if (lastBlockFrontHorseIndex !== -1) {
                    blockFrontPlotAreas.push(makeBlockedPlotArea(lastBlockFrontHorseIndexChangedTime, previousTime, lastBlockFrontHorseIndex));
                }
                lastBlockFrontHorseIndexChangedTime = previousTime;
                lastBlockFrontHorseIndex = horseFrame.blockFrontHorseIndex!;
            }
            if (horseFrame.temptationMode !== lastTemptationMode) {
                if (lastTemptationMode !== 0) {
                    temptationModePlotAreas.push(makeTemptationModePlotArea(lastTemptationModeChangedTime, previousTime, lastTemptationMode));
                }
                lastTemptationModeChangedTime = previousTime;
                lastTemptationMode = horseFrame.temptationMode!;
            }

            const distance = horseFrame.distance!;
            if (lastSpurtStartDistance > 0 && lastSpurtStartTime === 0 && lastSpurtStartDistance <= distance) {
                // i should never be 0 unless it has > 0 distance at frame 0, but just in case...
                if (i > 0) {
                    // Interpolate it.
                    const previousFrameDistance = previousHorseFrame.distance!;
                    lastSpurtStartTime = previousTime + (lastSpurtStartDistance - previousFrameDistance) / (distance - previousFrameDistance) * (time - previousTime);
                }
            }

            if (i === 0) {
                deltaSpeed.push({x: 0, y: 0});
                deltaHp.push({x: 0, y: 0});
            } else {
                deltaSpeed.push({x: time, y: horseFrame.speed! - previousHorseFrame.speed!});
                deltaHp.push({x: time, y: horseFrame.hp! - previousHorseFrame.hp!});
            }
        }
        const lastFrameTime = _.last(raceData.frame)!.time!;
        if (lastBlockFrontHorseIndex !== -1) {
            blockFrontPlotAreas.push(makeBlockedPlotArea(lastBlockFrontHorseIndexChangedTime, lastFrameTime, lastBlockFrontHorseIndex));
        }
        if (lastTemptationMode !== 0) {
            temptationModePlotAreas.push(makeTemptationModePlotArea(lastTemptationModeChangedTime, lastFrameTime, lastTemptationMode));
        }

        const plotLines = [{
            value: raceData.horseResult[frameOrder!].finishTimeRaw,
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
                    ...(this.state.showOtherRaceEvents ? otherEventsPlotLines : []),
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
                    data: raceData.frame.map(frame => {
                        return {
                            x: frame.time,
                            y: frame.horseFrame[frameOrder!].speed,
                        }
                    }),
                    type: "spline",
                }, {
                    name: "HP",
                    data: raceData.frame.map(frame => {
                        return {
                            x: frame.time,
                            y: frame.horseFrame[frameOrder!].hp,
                        }
                    }),
                    type: "spline",
                },
            ],
            tooltip: {shared: true},
            chart: {
                zoomType: "x",
                panning: {enabled: true}, panKey: "alt",
            },
        };

        const options2: Highcharts.Options = {
            chart: {
                height: "300px",
                zoomType: "x",
                panning: {enabled: true}, panKey: "alt",
            },
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

    renderOtherRaceEventsList() {
        const groupedEvents = _.groupBy(this.props.raceData.event.map(e => e.event!)
                .filter(e => otherRaceEventLabels.has(e.type!)),
            e => e.frameTime!);

        const d: CompeteTableData[] = _.values(groupedEvents).map(events => {
            const time = events[0].frameTime!;
            return {
                time: time,
                type: otherRaceEventLabels.get(events[0].type!)!,
                charas: events.map(e => {
                    const frameOrder = e.param[0];
                    return {
                        displayName: this.displayNames(this.props.raceHorseInfo, this.props.raceData)[frameOrder],
                    };
                }),
            };
        })

        return <FoldCard header='Other Race Events'>
            <BootstrapTable bootstrap4 condensed hover
                            classes="responsive-bootstrap-table"
                            wrapperClasses="table-responsive"
                            data={d}
                            columns={competeTableColumns}
                            keyField="time"/>
        </FoldCard>
    }

    renderCharaList() {
        if (!this.props.raceHorseInfo || this.props.raceHorseInfo.length === 0) {
            return undefined;
        }

        const l: CharaTableData[] = this.props.raceHorseInfo.map(data => {
            const frameOrder = data['frame_order'] - 1;

            const horseResult = this.props.raceData.horseResult[frameOrder];

            const trainedCharaData = fromRaceHorseData(data);
            return {
                trainedChara: trainedCharaData,
                chara: UMDatabaseWrapper.charas[trainedCharaData.charaId],

                frameOrder: frameOrder + 1,
                finishOrder: horseResult.finishOrder! + 1,

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

        this.props.raceData.frame.forEach(frame => {
            const time = frame.time!;

            const minDistance = _.min(frame.horseFrame.map(horseFrame => horseFrame.distance!))!;
            const maxDistance = _.max(frame.horseFrame.map(horseFrame => horseFrame.distance!))!;
            const baseDistance = (minDistance + maxDistance) / 2;

            frame.horseFrame.forEach((horseFrame, frameOrder) => {
                series[frameOrder].data!.push({
                    x: this.state.diffGraphUseDistanceAsXAxis ? baseDistance : time,
                    y: (horseFrame.distance! - baseDistance),
                });
            });
        });

        const options: Highcharts.Options = {
            chart: {
                zoomType: "x",
                panning: {enabled: true}, panKey: "alt",
            },
            title: {text: undefined},
            credits: {enabled: false},
            xAxis: {
                title: {text: this.state.diffGraphUseDistanceAsXAxis ? "Base Distance" : "Time"},
            },
            yAxis: {
                title: {text: undefined},
                startOnTick: false,
                endOnTick: false,
            },
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
            {(this.props.raceData.header!.version! > supportedRaceDataVersion) &&
                <Alert variant="warning">
                    RaceData version {this.props.raceData.header!.version!} higher than supported
                    version {supportedRaceDataVersion}, use at your own risk!
                </Alert>}
            {this.renderCharaList()}
            {this.renderGlobalRaceDistanceDiffGraph()}
            {this.renderOtherRaceEventsList()}
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
                    <Form.Switch
                        checked={this.state.showOtherRaceEvents}
                        onChange={(e) => this.setState({showOtherRaceEvents: e.target.checked})}
                        id="show-competes"
                        label={`Show Other Race Events (${Array.from(otherRaceEventLabels.values()).join(', ')})`}/>
                </Form.Group>
            </Form>
            {this.state.selectedCharaFrameOrder !== undefined && this.renderGraphs()}
            <hr/>
            <JsonViewer value={this.props.raceData.toJson()} defaultInspectDepth={1}/>
        </div>;
    }
}

export default RaceDataPresenter;
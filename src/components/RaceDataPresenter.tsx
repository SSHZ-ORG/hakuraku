import {RaceSimulateData, RaceSimulateEventData} from "../data/race_data_pb";
import React from "react";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import {Form} from "react-bootstrap";
import memoize from "memoize-one";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';


type RaceDataPresenterProps = {
    raceStartInfo: any,
    raceData: RaceSimulateData,
};

type RaceDataPresenterState = {
    selectedCharaFrameOrder: number | undefined,

    showSkills: boolean,
    showBlocks: boolean,
    showTemptationMode: boolean,
};

class RaceDataPresenter extends React.PureComponent<RaceDataPresenterProps, RaceDataPresenterState> {
    constructor(props: RaceDataPresenterProps) {
        super(props);

        this.state = {
            selectedCharaFrameOrder: undefined,

            showSkills: true,
            showBlocks: true,
            showTemptationMode: true,
        };
    }

    displayNames = memoize((raceStartInfo: any, raceData: RaceSimulateData) => {
        if (raceStartInfo === undefined || raceStartInfo['race_horse_data'] === undefined) {
            return {};
        }

        if (raceStartInfo['race_horse_data'].length !== raceData.getHorseResultList().length) {
            return {};
        }

        const m: Record<number, string> = {};
        raceStartInfo['race_horse_data'].forEach((d: any) => {
            const frameOrder = d['frame_order'] - 1; // 0-indexed
            const finishOrder = raceData.getHorseResultList()[frameOrder].getFinishOrder()! + 1; // 1-indexed
            const charaId = d['chara_id'];
            const charaDisplayName = charaId in UMDatabaseWrapper.charas ? UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[charaId]) : 'Unknown Chara / Mob';
            const trainerNameSuffix = d['trainer_name'] ? ` [Trainer: ${d['trainer_name']}]` : '';
            m[frameOrder] = `[${frameOrder + 1} 番 ${finishOrder} 着] ${charaDisplayName}${trainerNameSuffix}`;
        });
        return m;
    });

    renderGraphs() {
        const raceStartInfo = this.props.raceStartInfo;
        const raceData = this.props.raceData;
        const frameOrder = this.state.selectedCharaFrameOrder!;

        const displayNames = this.displayNames(raceStartInfo, raceData);

        const skillPlotLines = raceData.getEventList()
            .map(i => i.getEvent()!)
            .filter(event => event.getType() === RaceSimulateEventData.SimulateEventType.SKILL && event.getParamList()[0] === frameOrder)
            .map(event => {
                return {
                    value: event.getFrameTime(),
                    label: {text: UMDatabaseWrapper.skills[event.getParamList()[1]].getName()},
                    zIndex: 20,
                };
            });

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
            const horseFrame = frame.getHorseFrameList()[frameOrder!];

            const previousFrameTime = i === 0 ? 0 : raceData.getFrameList()[i - 1].getTime()!;
            if (horseFrame.getBlockFrontHorseIndex() !== lastBlockFrontHorseIndex) {
                if (lastBlockFrontHorseIndex !== -1) {
                    blockFrontPlotAreas.push(makeBlockedPlotArea(lastBlockFrontHorseIndexChangedTime, previousFrameTime, lastBlockFrontHorseIndex));
                }
                lastBlockFrontHorseIndexChangedTime = previousFrameTime;
                lastBlockFrontHorseIndex = horseFrame.getBlockFrontHorseIndex()!;
            }
            if (horseFrame.getTemptationMode() !== lastTemptationMode) {
                if (lastTemptationMode !== 0) {
                    temptationModePlotAreas.push(makeTemptationModePlotArea(lastTemptationModeChangedTime, previousFrameTime, lastTemptationMode));
                }
                lastTemptationModeChangedTime = previousFrameTime;
                lastTemptationMode = horseFrame.getTemptationMode()!;
            }

            if (lastSpurtStartTime === 0 && lastSpurtStartDistance <= horseFrame.getDistance()!) {
                lastSpurtStartTime = frame.getTime()!;
            }

            if (i === 0) {
                deltaSpeed.push({x: 0, y: 0});
                deltaHp.push({x: 0, y: 0});
            } else {
                const lastHorseFrame = raceData.getFrameList()[i - 1].getHorseFrameList()[frameOrder];
                deltaSpeed.push({x: frame.getTime(), y: horseFrame.getSpeed()! - lastHorseFrame.getSpeed()!});
                deltaHp.push({x: frame.getTime(), y: horseFrame.getHp()! - lastHorseFrame.getHp()!});
            }
        }
        const lastFrameTime = raceData.getFrameList()[raceData.getFrameList().length - 1].getTime()!;
        if (lastBlockFrontHorseIndex !== -1) {
            blockFrontPlotAreas.push(makeBlockedPlotArea(lastBlockFrontHorseIndexChangedTime, lastFrameTime, lastBlockFrontHorseIndex));
        }
        if (lastTemptationMode !== 0) {
            temptationModePlotAreas.push(makeTemptationModePlotArea(lastTemptationModeChangedTime, lastFrameTime, lastTemptationMode));
        }

        const options1: Highcharts.Options = {
            title: {text: undefined},
            credits: {enabled: false},
            xAxis: {
                title: {text: "Time"},
                plotLines: [
                    ...(this.state.showSkills ? skillPlotLines : []),
                    {
                        value: raceData.getHorseResultList()[frameOrder!].getFinishTimeRaw(),
                        dashStyle: 'LongDashDot',
                        label: {text: 'Goal in'},
                        zIndex: 20,
                    },
                    {
                        value: lastSpurtStartTime,
                        dashStyle: 'LongDash',
                        label: {text: `Last Spurt`},
                        zIndex: 0,
                    },
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
        };

        const options2: Highcharts.Options = {
            chart: {height: '300px'},
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

    render() {
        return <div>
            <Form>
                <Form.Group>
                    <Form.Label>Chara</Form.Label>
                    <Form.Control as="select" custom
                                  onChange={(e) => this.setState({selectedCharaFrameOrder: e.target.value ? parseInt(e.target.value) : undefined})}>
                        <option value="">-</option>
                        {Object.entries(this.displayNames(this.props.raceStartInfo, this.props.raceData))
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
        </div>;
    }
}

export default RaceDataPresenter;
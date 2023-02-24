import memoize from "memoize-one";
import React from "react";
import {Badge, Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {RaceInstance, SpecialCaseRace_RacePermission, WinsSaddle, WinsSaddle_WinSaddleType} from "../data/data_pb";
import * as UMDatabaseUtils from "../data/UMDatabaseUtils";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import FoldCard from "./FoldCard";

type WinSaddleRelationBonusCalculatorState = {
    chara1RaceInstances: RaceInstance[],
    chara2RaceInstances: RaceInstance[],
    showUsage: boolean,
    showSpecialCaseRaces: boolean,
}

const G1_RELATION_POINT = 3;

const simulateGenerateWinSaddle = memoize((raceInstances: RaceInstance[]) => {
    const raceInstanceIds = new Set(raceInstances.map(i => i.id));

    const winsSaddlesByGroup: Map<number, WinsSaddle[]> = new Map();
    UMDatabaseWrapper.umdb.winsSaddle
        .filter(ws => ws.raceInstanceId.every(race => raceInstanceIds.has(race)))
        .forEach(ws => {
            if (!winsSaddlesByGroup.has(ws.groupId!)) {
                winsSaddlesByGroup.set(ws.groupId!, []);
            }
            winsSaddlesByGroup.get(ws.groupId!)!.push(ws);
        });

    const finalWinsSaddles = [];
    for (let wss of winsSaddlesByGroup.values()) {
        wss.sort((a, b) => a.priority! - b.priority!);
        finalWinsSaddles.push(wss[0]);
    }
    return finalWinsSaddles;
});

function renderWinSaddles(winsSaddles: WinsSaddle[]) {
    return winsSaddles.map(ws => <Badge variant="secondary">{ws.id} - {ws.name}</Badge>);
}

class WinSaddleRelationBonusCalculator extends React.PureComponent<{}, WinSaddleRelationBonusCalculatorState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            chara1RaceInstances: [],
            chara2RaceInstances: [],
            showUsage: false,
            showSpecialCaseRaces: false,
        };
    }

    generateResult() {
        const chara1G1WinsSaddles = new Set(simulateGenerateWinSaddle(this.state.chara1RaceInstances)
            .filter(ws => ws.type === WinsSaddle_WinSaddleType.G1));
        const intersection = simulateGenerateWinSaddle(this.state.chara2RaceInstances)
            .filter(ws => chara1G1WinsSaddles.has(ws));

        return <>
            Result: {intersection.length * G1_RELATION_POINT} pts ({renderWinSaddles(intersection)})
        </>;
    }

    raceSelection(label: string, selectedRaces: RaceInstance[], callback: (races: RaceInstance[]) => void) {
        return <Form.Group>
            <Form.Label>{label} {renderWinSaddles(simulateGenerateWinSaddle(selectedRaces))}</Form.Label>
            <Typeahead labelKey={(race) => `${race.id} - ${race.name}`}
                       multiple
                       clearButton
                       options={UMDatabaseWrapper.interestingRaceInstances}
                       selected={selectedRaces}
                       onChange={callback}/>
        </Form.Group>;
    }

    usagePresenter() {
        return <>
            <Button variant="secondary" size="sm" onClick={() => this.setState({showUsage: true})}>
                Usage
            </Button>

            <Modal show={this.state.showUsage} onHide={() => this.setState({showUsage: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Usage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Just fill in all races where the 2 characters won (as 一着).</p>
                    <p>This is different than 因子 (because winning a race does not always generate 因子).</p>
                    <p>It is difficult to see the grand parents' won races in the UI, and you unfortunately have to find
                        them manually.</p>
                    <p>Note that there are some special races. (Hover the button to see them.) They only apply to
                        specific characters, for specific years. Other than that list, you should choose the normal one.
                        This is important because these special races are calculated specially. Specifically, they are
                        calculated separately, but would be 'overridden' by the normal ones.
                        Examples for メジロマックイーン - she has special 102501 - 宝塚記念 in the third year:</p>
                    <ul>
                        <li>If she won 宝塚記念 in the second year only, add the normal one only (101201 - 宝塚記念).
                        </li>
                        <li>If she won 宝塚記念 in the third year only, add the special one only (102501 - 宝塚記念).
                        </li>
                        <li>If she won 宝塚記念 in both years, add both 101201 - 宝塚記念 and 102501 - 宝塚記念. We will
                            automatically perform the calculation about overriding for you.
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>;
    }

    specialCaseRacePresenter() {
        return <>
            <Button variant="warning" size="sm" onClick={() => this.setState({showSpecialCaseRaces: true})}>
                Special Case Races
            </Button>

            <Modal show={this.state.showSpecialCaseRaces} onHide={() => this.setState({showSpecialCaseRaces: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Special Case Races</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {UMDatabaseWrapper.umdb.specialCaseRace.map(specialCaseRace =>
                        <>
                            {UMDatabaseWrapper.raceInstanceNameWithId(specialCaseRace.raceInstanceId!)}
                            <br/>
                            ({SpecialCaseRace_RacePermission[specialCaseRace.racePermission!]})
                            <br/>
                            {specialCaseRace.charaId.map(i => <>
                                {UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[i])}<br/>
                            </>)}
                            <hr/>
                        </>,
                    )}
                    All other races should use the default instance.
                </Modal.Body>
            </Modal>
        </>;
    }

    clearAll() {
        this.setState({
            chara1RaceInstances: [],
            chara2RaceInstances: [],
        });
    }

    render() {
        return <FoldCard header="勝鞍ボーナス Calculator">
            {this.usagePresenter()}{" "}{this.specialCaseRacePresenter()}{" "}
            <Button variant="danger" size="sm" onClick={() => this.clearAll()}>Clear all</Button>
            {this.raceSelection("Chara 1", this.state.chara1RaceInstances, s => this.setState({chara1RaceInstances: s}))}
            {this.raceSelection("Chara 2", this.state.chara2RaceInstances, s => this.setState({chara2RaceInstances: s}))}
            {this.generateResult()}
        </FoldCard>;
    }
}

export default WinSaddleRelationBonusCalculator;

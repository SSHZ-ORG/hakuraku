import React from "react";
import {Badge, Button, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import memoize from "memoize-one";
import {RaceInstance, SpecialCaseRace_RacePermission, WinsSaddle} from "../data/data_pb";
import FoldCard from "./FoldCard";

type WinSaddleRelationBonusCalculatorState = {
    parentRaceInstances: RaceInstance[],
    grandparent1RaceInstances: RaceInstance[],
    grandparent2RaceInstances: RaceInstance[],
    showUsage: boolean,
}

class WinSaddleRelationBonusCalculator extends React.PureComponent<{}, WinSaddleRelationBonusCalculatorState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            parentRaceInstances: [],
            grandparent1RaceInstances: [],
            grandparent2RaceInstances: [],
            showUsage: false,
        };
    }

    simulateGenerateWinSaddle = memoize((raceInstances: RaceInstance[]) => {
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


    renderWinSaddles(winsSaddles: WinsSaddle[]) {
        return winsSaddles.map(ws => <Badge variant="secondary">{ws.id} - {ws.name}</Badge>)
    }

    renderOneResult(winsSaddles: WinsSaddle[]) {
        return <div>
            {winsSaddles.length} pts ({this.renderWinSaddles(winsSaddles)})
        </div>
    }

    generateResult() {
        const parentWinsSaddles = new Set(this.simulateGenerateWinSaddle(this.state.parentRaceInstances));
        const winsSaddlesInteraction1 = this.simulateGenerateWinSaddle(this.state.grandparent1RaceInstances)
            .filter(ws => parentWinsSaddles.has(ws));
        const winsSaddlesInteraction2 = this.simulateGenerateWinSaddle(this.state.grandparent2RaceInstances)
            .filter(ws => parentWinsSaddles.has(ws));

        return <div>
            Parent & Grandparent 1: {this.renderOneResult(winsSaddlesInteraction1)}
            Parent & Grandparent 2: {this.renderOneResult(winsSaddlesInteraction2)}
            Total: {winsSaddlesInteraction1.length + winsSaddlesInteraction2.length} pts
        </div>
    }

    raceSelection(label: string, selectedRaces: RaceInstance[], callback: (races: RaceInstance[]) => void) {
        return <Form.Group>
            <Form.Label>{label} {this.renderWinSaddles(this.simulateGenerateWinSaddle(selectedRaces))}</Form.Label>
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
                    <p>Just fill in all races where the 3 characters won (as 一着).</p>
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
                    <p>
                        If you know how to decrypt the responses, it's suggested that you just&nbsp;
                        <code>
                            sum(1 for i in c['succession_chara_array'][:2] for s in i['win_saddle_id_array'] if s in
                            c['win_saddle_id_array'])
                        </code>
                        &nbsp;to avoid human errors.
                    </p>
                </Modal.Body>
            </Modal>
        </>;
    }

    specialCaseRacePresenter() {
        const popover = (
            <Popover id="special-case-races">
                <Popover.Title as="h3">Special Case Races</Popover.Title>
                <Popover.Content>
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
                        </>
                    )}
                    All other races should use the default instance.
                </Popover.Content>
            </Popover>
        );

        return <OverlayTrigger placement="right" overlay={popover}>
            <Button variant="warning" size="sm">Special Case Races</Button>
        </OverlayTrigger>
    }

    clearAll() {
        this.setState({
            parentRaceInstances: [],
            grandparent1RaceInstances: [],
            grandparent2RaceInstances: [],
        });
    }

    render() {
        return <FoldCard header='勝鞍ボーナス Calculator'>
            {this.usagePresenter()}{" "}{this.specialCaseRacePresenter()}{" "}
            <Button variant="danger" size="sm" onClick={() => this.clearAll()}>Clear all</Button>
            {this.raceSelection("Parent", this.state.parentRaceInstances, s => this.setState({parentRaceInstances: s}))}
            {this.raceSelection("Grandparent 1", this.state.grandparent1RaceInstances, s => this.setState({grandparent1RaceInstances: s}))}
            {this.raceSelection("Grandparent 2", this.state.grandparent2RaceInstances, s => this.setState({grandparent2RaceInstances: s}))}
            {this.generateResult()}
        </FoldCard>;
    }
}

export default WinSaddleRelationBonusCalculator;

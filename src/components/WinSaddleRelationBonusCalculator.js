import React from "react";
import {Badge, Button, Card, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import memoize from "memoize-one";

class WinSaddleRelationBonusCalculator extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            extended: false,
            parentRaceInstances: [],
            grandparent1RaceInstances: [],
            grandparent2RaceInstances: [],

            showUsage: false,
        };
    }

    onToggle() {
        this.setState((state) => {
            return {
                extended: !state.extended
            };
        });
    }

    renderWinSaddles(winsSaddles) {
        return winsSaddles.map(ws => <Badge variant="secondary">{ws.getId()} - {ws.getName()}</Badge>)
    }

    renderOneResult(winsSaddles) {
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

    simulateGenerateWinSaddle = memoize(raceInstances => {
        const raceInstanceIds = new Set(raceInstances.map(i => i.getId()));

        const winsSaddlesByGroup = new Map();
        UMDatabaseWrapper.umdb.getWinsSaddleList()
            .filter(ws => ws.getRaceInstanceIdList().every(race => raceInstanceIds.has(race)))
            .forEach(ws => {
                if (!winsSaddlesByGroup.has(ws.getGroupId())) {
                    winsSaddlesByGroup.set(ws.getGroupId(), []);
                }
                winsSaddlesByGroup.get(ws.getGroupId()).push(ws);
            });

        const finalWinsSaddles = [];
        for (let wss of winsSaddlesByGroup.values()) {
            wss.sort((a, b) => a.getPriority() - b.getPriority());
            finalWinsSaddles.push(wss[0]);
        }
        return finalWinsSaddles;
    });

    raceSelection(label, selected, callback) {
        return <div>
            <Form.Group>
                <Form.Label>{label} {this.renderWinSaddles(this.simulateGenerateWinSaddle(selected))}</Form.Label>
                <Typeahead labelKey={(race) => `${race.getId()} - ${race.getName()}`}
                           multiple
                           clearButton
                           options={UMDatabaseWrapper.interestingRaceInstances}
                           selected={selected}
                           onChange={callback}/>
            </Form.Group>
        </div>;
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
                        <li>If she won 宝塚記念 in the second year only, add the normal one only (101201 - 宝塚記念).</li>
                        <li>If she won 宝塚記念 in the third year only, add the special one only (102501 - 宝塚記念).</li>
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
        </>
    }

    specialCaseRacePresenter() {
        const popover = (
            <Popover>
                <Popover.Title as="h3">Special Case Races</Popover.Title>
                <Popover.Content>
                    {UMDatabaseWrapper.umdb.getSpecialCaseRaceList().map(specialCaseRace =>
                        <div>
                            {specialCaseRace.getRaceInstanceId()}
                            &nbsp;-&nbsp;
                            {UMDatabaseWrapper.raceInstances[specialCaseRace.getRaceInstanceId()].getName()}
                            <br/>
                            ({UMDatabaseUtils.racePermissionEnumNames[specialCaseRace.getRacePermission()]})
                            <br/>
                            {specialCaseRace.getCharaIdList().map(i => <>
                                {UMDatabaseUtils.charaNameWithIdAndCast(UMDatabaseWrapper.charas[i])}<br/>
                            </>)}
                            <hr/>
                        </div>
                    )}
                    <div>All other races should use the default instance.</div>
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
        return <Card>
            <Card.Header onClick={() => this.onToggle()} style={{cursor: "pointer"}}>
                勝鞍ボーナス Calculator
            </Card.Header>
            {this.state.extended &&
            <Card.Body>
                {this.usagePresenter()}{" "}{this.specialCaseRacePresenter()}{" "}
                <Button variant="danger" size="sm" onClick={() => this.clearAll()}>Clear all</Button>
                {this.raceSelection("Parent", this.state.parentRaceInstances, s => this.setState({parentRaceInstances: s}))}
                {this.raceSelection("Grandparent 1", this.state.grandparent1RaceInstances, s => this.setState({grandparent1RaceInstances: s}))}
                {this.raceSelection("Grandparent 2", this.state.grandparent2RaceInstances, s => this.setState({grandparent2RaceInstances: s}))}
                {this.generateResult()}
            </Card.Body>}
        </Card>
    }
}

export default WinSaddleRelationBonusCalculator;

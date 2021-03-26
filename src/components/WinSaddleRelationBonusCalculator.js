import React from "react";
import {Badge, Button, Card, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";
import UMDatabaseUtils from "../data/UMDatabaseUtils";

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
        const raceInstanceIds = new Set(this.state.parentRaceInstances.map(i => i.getId()));
        const intersectionRaceIds1 = new Set(this.state.grandparent1RaceInstances.map(i => i.getId()).filter(i => raceInstanceIds.has(i)));
        const intersectionRaceIds2 = new Set(this.state.grandparent2RaceInstances.map(i => i.getId()).filter(i => raceInstanceIds.has(i)));

        const winsSaddles1 = UMDatabaseWrapper.umdb.getWinsSaddleList()
            .filter(ws => ws.getRaceInstanceIdList().every(race => intersectionRaceIds1.has(race)));
        const winsSaddles2 = UMDatabaseWrapper.umdb.getWinsSaddleList()
            .filter(ws => ws.getRaceInstanceIdList().every(race => intersectionRaceIds2.has(race)));

        return <div>
            Parent & Grandparent 1: {this.renderOneResult(winsSaddles1)}
            Parent & Grandparent 2: {this.renderOneResult(winsSaddles2)}
            Total: {winsSaddles1.length + winsSaddles2.length} pts
        </div>
    }

    raceSelection(label, selected, callback) {
        const raceInstanceIds = new Set(selected.map(i => i.getId()));
        const winsSaddles = UMDatabaseWrapper.umdb.getWinsSaddleList()
            .filter(ws => ws.getRaceInstanceIdList().every(race => raceInstanceIds.has(race)));

        return <div>
            <Form.Group>
                <Form.Label>{label} {this.renderWinSaddles(winsSaddles)}</Form.Label>
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
                        This is important because these special races are calculated separately.
                        Examples for メジロマックイーン - she has special 102501 - 宝塚記念 in the third year:</p>
                    <ul>
                        <li>If she won 宝塚記念 in the second year only, add only the normal one (101201 - 宝塚記念).</li>
                        <li>If she won 宝塚記念 in the third year only, add only the special one (102501 - 宝塚記念).</li>
                        <li>If she won 宝塚記念 in both years, add both 101201 - 宝塚記念 and 102501 - 宝塚記念.</li>
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
                            {specialCaseRace.getCharaIdList().map(i => UMDatabaseWrapper.charas[i].getName()).join(', ')}
                            <br/>
                            <br/>
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

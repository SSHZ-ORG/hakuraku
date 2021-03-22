import React from "react";
import {Badge, Card, Form} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

class WinSaddleRelationBonusCalculator extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            extended: false,
            parentRaceInstances: [],
            grandparent1RaceInstances: [],
            grandparent2RaceInstances: [],
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
                           options={UMDatabaseWrapper.interestingRaceInstances}
                           selected={selected}
                           onChange={callback}/>
            </Form.Group>
        </div>;
    }

    render() {
        return <Card>
            <Card.Header onClick={() => this.onToggle()} style={{cursor: "pointer"}}>勝鞍ボーナス Calculator</Card.Header>
            {this.state.extended &&
            <Card.Body>
                {this.raceSelection("Parent", this.state.parentRaceInstances, s => this.setState({parentRaceInstances: s}))}
                {this.raceSelection("Grandparent 1", this.state.grandparent1RaceInstances, s => this.setState({grandparent1RaceInstances: s}))}
                {this.raceSelection("Grandparent 2", this.state.grandparent2RaceInstances, s => this.setState({grandparent2RaceInstances: s}))}
                {this.generateResult()}
            </Card.Body>}
        </Card>
    }
}

export default WinSaddleRelationBonusCalculator;

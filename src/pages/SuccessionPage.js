import React from 'react';
import CharaSelector from "../components/CharaSelector";
import {Alert, Card, Form, Table} from "react-bootstrap";
import SuccessionRelationsPresenter from "../components/SuccessionRelationsPresenter";
import UMDatabaseUtils from "../data/UMDatabaseUtils";
import WinSaddleRelationBonusCalculator from "../components/WinSaddleRelationBonusCalculator";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";

const RELATIONSHIP_PAIRS = [
    ['selectedChara', 'parent1'],
    ['selectedChara', 'parent2'],
    ['parent1', 'parent2'],
    ['selectedChara', 'parent1', 'grandparent11'],
    ['selectedChara', 'parent1', 'grandparent12'],
    ['selectedChara', 'parent2', 'grandparent21'],
    ['selectedChara', 'parent2', 'grandparent22'],
];

export default class SuccessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChara: null,
            parent1: null,
            grandparent11: null,
            grandparent12: null,
            parent2: null,
            grandparent21: null,
            grandparent22: null,

            parent1WinSaddleBonus: 0,
            parent2WinSaddleBonus: 0,

            validatorMessages: [],
        }
    }

    charaSelectionChanged() {
        const state = this.state;

        const validatorMessages = [];

        function validateSameChara(key1, key2) {
            if (state[key1] === null || state[key2] === null) return;
            if (state[key1].getId() === state[key2].getId()) {
                validatorMessages.push(`${key1} and ${key2} are the same`);
            }
        }

        validateSameChara('selectedChara', 'parent1');
        validateSameChara('selectedChara', 'parent2');
        validateSameChara('parent1', 'parent2');
        validateSameChara('parent1', 'grandparent11');
        validateSameChara('parent1', 'grandparent12');
        validateSameChara('grandparent11', 'grandparent12');
        validateSameChara('parent2', 'grandparent21');
        validateSameChara('parent2', 'grandparent22');
        validateSameChara('grandparent21', 'grandparent22');

        this.setState({validatorMessages: validatorMessages});
    }

    setChara(key, chara) {
        this.setState((state) => state[key] = chara, this.charaSelectionChanged);
    }

    generateRelationsPresenter(keys) {
        const charas = keys.map(key => this.state[key]);
        if (charas.includes(null)) return <div/>;

        return <SuccessionRelationsPresenter
            title={`${keys.join(', ')} - ${charas.map(c => c.getName()).join(', ')}`}
            relations={UMDatabaseWrapper.findSuccessionRelation(charas)}/>;
    }

    totalPoints() {
        const pairs = [];
        for (let pair of RELATIONSHIP_PAIRS) {
            const charas = pair.map(key => this.state[key]);
            if (charas.includes(null)) continue;
            pairs.push(charas);
        }

        const relations = pairs.map(pair => UMDatabaseWrapper.findSuccessionRelation(pair));
        const totalPoints =
            relations.map(r => UMDatabaseUtils.calculateTotalPoint(r)).reduce((a, b) => a + b, 0)
            + this.state.parent1WinSaddleBonus + this.state.parent2WinSaddleBonus;

        return <Card bg="primary" text="white">
            <Card.Body>
                <Card.Title>
                    {UMDatabaseUtils.getRelationRank(totalPoints)}
                </Card.Title>
                <Card.Text>
                    Total Points: {totalPoints}
                </Card.Text>
            </Card.Body>
        </Card>
    }

    winSaddleRelationBonusInput(onChange) {
        return <Form.Group>
            <Form.Label>WinSaddleRelationBonus</Form.Label>
            <Form.Control type="number" placeholder="0" onChange={onChange}/>
        </Form.Group>
    }

    render() {
        return (
            <div>
                <Form>
                    <CharaSelector label="Chara"
                                   onSelectedCharaChange={(chara) => this.setChara('selectedChara', chara)}/>
                    <Table>
                        <tbody>
                        <tr>
                            <td rowSpan="2">
                                <CharaSelector label="Parent1"
                                               onSelectedCharaChange={(chara) => this.setChara('parent1', chara)}/>
                                {this.winSaddleRelationBonusInput((event) => this.setState({parent1WinSaddleBonus: parseInt(event.target.value) || 0}))}
                            </td>
                            <td>
                                <CharaSelector label="Grandparent11"
                                               onSelectedCharaChange={(chara) => this.setChara('grandparent11', chara)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CharaSelector label="Grandparent12"
                                               onSelectedCharaChange={(chara) => this.setChara('grandparent12', chara)}/>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan="2">
                                <CharaSelector label="Parent2"
                                               onSelectedCharaChange={(chara) => this.setChara('parent2', chara)}/>
                                {this.winSaddleRelationBonusInput((event) => this.setState({parent2WinSaddleBonus: parseInt(event.target.value) || 0}))}
                            </td>
                            <td>
                                <CharaSelector label="Grandparent21"
                                               onSelectedCharaChange={(chara) => this.setChara('grandparent21', chara)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CharaSelector label="Grandparent22"
                                               onSelectedCharaChange={(chara) => this.setChara('grandparent22', chara)}/>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Form>
                {this.state.validatorMessages.map(message => <Alert variant="danger">{message}</Alert>)}
                <WinSaddleRelationBonusCalculator/>
                {this.totalPoints()}
                {RELATIONSHIP_PAIRS.map(pair => this.generateRelationsPresenter(pair))}
            </div>
        );
    }
}

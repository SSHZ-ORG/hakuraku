import _ from "lodash";
import React, {ChangeEventHandler} from 'react';
import {Alert, Button, Card, Form, Table} from "react-bootstrap";
import CharaSelector from "../components/CharaSelector";
import SuccessionRelationChip from "../components/SuccessionRelationChip";
import WinSaddleRelationBonusCalculator from "../components/WinSaddleRelationBonusCalculator";
import {Chara} from "../data/data_pb";
import * as UMDatabaseUtils from "../data/UMDatabaseUtils";

type SelectedCharasState = {
    selectedChara: Chara | undefined,
    parent1: Chara | undefined,
    grandparent11: Chara | undefined,
    grandparent12: Chara | undefined,
    parent2: Chara | undefined,
    grandparent21: Chara | undefined,
    grandparent22: Chara | undefined,
};


type SuccessionPageState = SelectedCharasState & {
    suggestionEnabled: boolean,

    parent1WinSaddleBonus: number,
    parent2WinSaddleBonus: number,

    parentsWinSaddleBonus: number,

    validatorMessages: string[],
};

const RELATIONSHIP_PAIRS: (keyof SelectedCharasState)[][] = [
    ['selectedChara', 'parent1'],
    ['selectedChara', 'parent2'],
    ['parent1', 'parent2'],
    ['selectedChara', 'parent1', 'grandparent11'],
    ['selectedChara', 'parent1', 'grandparent12'],
    ['selectedChara', 'parent2', 'grandparent21'],
    ['selectedChara', 'parent2', 'grandparent22'],
];

export default class SuccessionPage extends React.Component<{}, SuccessionPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            suggestionEnabled: false,

            selectedChara: undefined,
            parent1: undefined,
            grandparent11: undefined,
            grandparent12: undefined,
            parent2: undefined,
            grandparent21: undefined,
            grandparent22: undefined,

            parent1WinSaddleBonus: 0,
            parent2WinSaddleBonus: 0,
            parentsWinSaddleBonus: 0,

            validatorMessages: [],
        };
    }

    charaSelectionChanged() {
        const state = this.state;

        const validatorMessages: string[] = [];

        function validateSameChara(key1: keyof SelectedCharasState, key2: keyof SelectedCharasState) {
            if (state[key1] === undefined || state[key2] === undefined) return;
            if (state[key1]!.id === state[key2]!.id) {
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

    setChara(key: keyof SelectedCharasState, chara: Chara) {
        const s: Pick<SelectedCharasState, any> = {};
        s[key] = chara;
        this.setState(s, this.charaSelectionChanged);
    }

    generateRelationsPresenter(keys: (keyof SelectedCharasState)[]) {
        const charas = keys.map(key => this.state[key]);
        if (charas.includes(undefined)) return <div/>;

        const title = `${keys.join(', ')} - ${(charas as Chara[]).map(UMDatabaseUtils.charaNameWithIdAndCast).join(', ')}`;
        const relations = UMDatabaseUtils.findSuccessionRelation(charas);

        return <Card>
            <Card.Header>{title} - {UMDatabaseUtils.calculateTotalPoint(relations)} pts</Card.Header>
            <Card.Body>
                <Card.Text>
                    {relations.map(relation => <><SuccessionRelationChip relation={relation} showId={false}/>{' '}</>)}
                </Card.Text>
            </Card.Body>
        </Card>;
    }

    totalPoints() {
        const pairs = [];
        for (let pair of RELATIONSHIP_PAIRS) {
            const charas = pair.map((key: keyof SelectedCharasState) => this.state[key]);
            if (charas.includes(undefined)) continue;
            pairs.push(charas);
        }

        const relations = pairs.map(pair => UMDatabaseUtils.findSuccessionRelation(pair));
        const totalPoints = _.sumBy(relations, r => UMDatabaseUtils.calculateTotalPoint(r))
            + this.state.parent1WinSaddleBonus + this.state.parent2WinSaddleBonus + this.state.parentsWinSaddleBonus;

        return <Card bg="primary" text="white">
            <Card.Body>
                <Card.Title>
                    {UMDatabaseUtils.getRelationRank(totalPoints)}
                </Card.Title>
                <Card.Text>
                    Total Points: {totalPoints}
                </Card.Text>
            </Card.Body>
        </Card>;
    }

    winSaddleRelationBonusInput(onChange: ChangeEventHandler<HTMLInputElement>, suffix: string) {
        return <Form.Group>
            <Form.Label>勝鞍 Bonus ({suffix})</Form.Label>
            <Form.Control type="number" placeholder="0" onChange={onChange}/>
        </Form.Group>;
    }

    clearAll() {
        this.setState({
            selectedChara: undefined,
            parent1: undefined,
            grandparent11: undefined,
            grandparent12: undefined,
            parent2: undefined,
            grandparent21: undefined,
            grandparent22: undefined,

            parent1WinSaddleBonus: 0,
            parent2WinSaddleBonus: 0,
            parentsWinSaddleBonus: 0,
        });
    }

    render() {
        return <>
            <Form>
                <Button variant="danger" size="sm" onClick={() => this.clearAll()}>Clear all</Button>
                <CharaSelector label="Chara"
                               selectedChara={this.state.selectedChara}
                               onSelectedCharaChange={(chara) => this.setChara('selectedChara', chara)}/>
                <Form.Switch checked={this.state.suggestionEnabled}
                             onChange={(e) => this.setState({suggestionEnabled: e.target.checked})}
                             id="suggestion-checkbox"
                             label="Enable Suggestion"/>
                <Table>
                    <tbody>
                    <tr>
                        <td rowSpan={2}>
                            <CharaSelector
                                label={this.state.suggestionEnabled ? "Parent 1 (suggesting based on Chara)" : "Parent 1"}
                                selectedChara={this.state.parent1}
                                onSelectedCharaChange={(chara) => this.setChara('parent1', chara)}
                                constraintGroups={this.state.suggestionEnabled ? [[this.state.selectedChara]] : undefined}/>
                            {this.winSaddleRelationBonusInput((event) => this.setState({parent1WinSaddleBonus: parseInt(event.target.value) || 0}), "1 x 11 + 1 x 12")}
                        </td>
                        <td>
                            <CharaSelector
                                label={this.state.suggestionEnabled ? "Grandparent 11 (suggesting based on Chara & Parent 1)" : "Grandparent 11"}
                                selectedChara={this.state.grandparent11}
                                onSelectedCharaChange={(chara) => this.setChara('grandparent11', chara)}
                                constraintGroups={this.state.suggestionEnabled ? [[this.state.selectedChara, this.state.parent1]] : undefined}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <CharaSelector
                                label={this.state.suggestionEnabled ? "Grandparent 12 (suggesting based on Chara & Parent 1)" : "Grandparent 12"}
                                selectedChara={this.state.grandparent12}
                                onSelectedCharaChange={(chara) => this.setChara('grandparent12', chara)}
                                constraintGroups={this.state.suggestionEnabled ? [[this.state.selectedChara, this.state.parent1]] : undefined}/>
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>
                            <CharaSelector
                                label={this.state.suggestionEnabled ? "Parent 2 (suggesting based on Chara + Parent 1)" : "Parent 2"}
                                selectedChara={this.state.parent2}
                                onSelectedCharaChange={(chara) => this.setChara('parent2', chara)}
                                constraintGroups={this.state.suggestionEnabled ? [[this.state.selectedChara], [this.state.parent1]] : undefined}/>
                            {this.winSaddleRelationBonusInput((event) => this.setState({parent2WinSaddleBonus: parseInt(event.target.value) || 0}), "2 x 21 + 2 x 22")}
                        </td>
                        <td>
                            <CharaSelector
                                label={this.state.suggestionEnabled ? "Grandparent 21 (suggesting based on Chara & Parent 2)" : "Grandparent 21"}
                                selectedChara={this.state.grandparent21}
                                onSelectedCharaChange={(chara) => this.setChara('grandparent21', chara)}
                                constraintGroups={this.state.suggestionEnabled ? [[this.state.selectedChara, this.state.parent2]] : undefined}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <CharaSelector
                                label={this.state.suggestionEnabled ? "Grandparent 22 (suggesting based on Chara & Parent 2)" : "Grandparent 22"}
                                selectedChara={this.state.grandparent22}
                                onSelectedCharaChange={(chara) => this.setChara('grandparent22', chara)}
                                constraintGroups={this.state.suggestionEnabled ? [[this.state.selectedChara, this.state.parent2]] : undefined}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {this.winSaddleRelationBonusInput((event) => this.setState({parentsWinSaddleBonus: parseInt(event.target.value) || 0}), "1 x 2")}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Form>
            {this.state.validatorMessages.map(message => <Alert variant="danger">{message}</Alert>)}
            <WinSaddleRelationBonusCalculator/>
            <hr/>
            {this.totalPoints()}
            <hr/>
            {RELATIONSHIP_PAIRS.map(pair => this.generateRelationsPresenter(pair))}
        </>;
    }
}

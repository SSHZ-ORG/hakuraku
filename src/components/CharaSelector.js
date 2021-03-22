import React from 'react';
import {Form} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Typeahead} from "react-bootstrap-typeahead";
import KanaTypeaheadMatcher from "../utils/KanaTypeaheadMatcher";
import UMDatabaseWrapper from "../data/UMDatabaseWrapper";


class CharaSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            selectedCharaId: 0
        };
    }

    onSelectionChange(selectedChara) {
        if (selectedChara === undefined) {
            this.setState({valid: false});
            return;
        }
        this.setState({valid: true, selectedCharaId: selectedChara.getId()});
        this.props.onSelectedCharaChange(selectedChara);
    }

    render() {
        return <Form.Group>
            <Form.Label>{this.props.label}</Form.Label>
            <Typeahead labelKey={(chara) => `${chara.getId()} - ${chara.getName()}`}
                       options={UMDatabaseWrapper.umdb.getCharaList()}
                       onChange={(selection) => this.onSelectionChange(selection[0])}
                       filterBy={KanaTypeaheadMatcher}
                       isInvalid={!this.state.valid}/>
        </Form.Group>
    }
}

export default CharaSelector;

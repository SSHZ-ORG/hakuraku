import React, {ChangeEvent} from "react";
import {Col, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import ReactJson from "react-json-view";
// @ts-ignore
import msgpack from "@ygoe/msgpack";
// @ts-ignore
import struct from "@aksel/structjs";

type CarrotJuicerPageState = {
    selectedFiles: File[],
    currentFile: File | undefined,
    currentFileContent: any,
};

export default class CarrotJuicerPage extends React.Component<{}, CarrotJuicerPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedFiles: [],
            currentFile: undefined,
            currentFileContent: undefined,
        }
    }

    onSelectedFilesChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null || e.target.files.length === 0) {
            return;
        }
        // @ts-ignore
        this.setState({selectedFiles: Array.from(e.target.files)});
    }

    skipRequestHeader(buffer: ArrayBuffer) {
        const offset = struct('<i').unpack_from(buffer, 0)[0];
        return buffer.slice(4 + offset);
    }

    onCurrentFileChange(file: File) {
        this.setState({currentFile: file});

        file.arrayBuffer().then((content: ArrayBuffer) => {
            const bytesToUse = file.name.endsWith("Q.msgpack") ? this.skipRequestHeader(content) : content;
            this.setState({currentFileContent: msgpack.deserialize(bytesToUse)});
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Form.File label="Select the packets captured by CarrotJuicer here..." custom multiple
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => this.onSelectedFilesChange(e)}/>
                    </Col>
                </Row>
                <Row style={{height: '90vh'}}>
                    <Col style={{maxHeight: '100%', overflowY: 'auto'}}>
                        <ListGroup>
                            {this.state.selectedFiles.map(file =>
                                <ListGroupItem action onClick={() => this.onCurrentFileChange(file)}
                                               active={file === this.state.currentFile}>
                                    {file.name}
                                </ListGroupItem>)}
                        </ListGroup>
                    </Col>
                    <Col xs="8" style={{maxHeight: '100%', overflowY: 'auto'}}>
                        <ReactJson src={this.state.currentFileContent} collapsed={2}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
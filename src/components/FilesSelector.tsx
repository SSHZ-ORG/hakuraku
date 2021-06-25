import React, {ChangeEvent} from "react";
import {Form} from "react-bootstrap";

type FilesSelectorProps = {
    instructions?: React.ReactNode,

    onFilesChange: (files: File[]) => void,
};

export default class FilesSelector extends React.Component<FilesSelectorProps> {

    onSelectedFilesChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null || e.target.files === undefined || e.target.files.length === 0) {
            this.props.onFilesChange([]);
            return;
        }
        this.props.onFilesChange(Array.from(e.target.files));
    }

    render() {
        return <Form>
            <Form.Group>
                <Form.File label="Select the packets captured by CarrotJuicer here..." custom multiple
                           onChange={(e: ChangeEvent<HTMLInputElement>) => this.onSelectedFilesChange(e)}/>
                <Form.Text muted>
                    Use <a href="https://github.com/CNA-Bld/Riru-CarrotJuicer"
                           target="_blank" rel="noreferrer">Riru-CarrotJuicer</a> (Android)
                    or <a href="https://github.com/CNA-Bld/EXNOA-CarrotJuicer"
                          target="_blank" rel="noreferrer">EXNOA-CarrotJuicer</a> (Windows)
                    to capture your packets. {this.props.instructions ?? ''}
                </Form.Text>
            </Form.Group>
        </Form>;
    }
}

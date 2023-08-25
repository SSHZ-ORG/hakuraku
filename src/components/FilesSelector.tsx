import React, {ChangeEvent} from "react";
import {Form} from "react-bootstrap";

type FilesSelectorProps = {
    instructions?: React.ReactNode,

    onFilesChange: (files: File[]) => void,
};

export default function FilesSelector(props: FilesSelectorProps) {

    function onSelectedFilesChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null || e.target.files === undefined || e.target.files.length === 0) {
            props.onFilesChange([]);
            return;
        }
        props.onFilesChange(Array.from(e.target.files));
    }

    return <Form>
        <Form.Group>
            <Form.File label="Select the packets captured by CarrotJuicer here..." custom multiple
                       onChange={(e: ChangeEvent<HTMLInputElement>) => onSelectedFilesChange(e)}/>
            <Form.Text muted>
                <>
                    Use <a href="https://github.com/CNA-Bld/Riru-CarrotJuicer"
                           target="_blank" rel="noreferrer">Riru-CarrotJuicer</a> (Android)
                    or <a href="https://github.com/CNA-Bld/EXNOA-CarrotJuicer"
                          target="_blank" rel="noreferrer">EXNOA-CarrotJuicer</a> (Windows)
                    to capture your packets. {props.instructions ?? ''}
                </>
            </Form.Text>
        </Form.Group>
    </Form>;
}

import React, { PureComponent } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Modal from './Modal';
import { Button } from 'reactstrap';

export default class extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            editorState: EditorState.createEmpty()
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    toggleModal() {
        const updateState = { show: !this.state.show };
        if (!this.state.show) { updateState.editorState = EditorState.createEmpty(); }
        this.setState(updateState);
    }

    handleChanged(editorState) {
        this.setState({
            editorState
        });
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.handleChanged(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    render() {
        const { title } = this.props;
        return (
            <section className='draft-js-sec'>
                <Button
                    color='primary'
                    onClick={this.toggleModal}
                    >
                    {title}
                </Button>
                <Modal
                    title={title}
                    show={this.state.show}
                    toggle={this.toggleModal}
                    >
                    <section className='form-control'>
                        <Editor
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.handleChanged}
                            />
                    </section>
                </Modal>
            </section>
        );
    }
}

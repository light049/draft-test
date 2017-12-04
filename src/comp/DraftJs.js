import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    CompositeDecorator,
    ContentState,
    Editor,
    EditorState,
    RichUtils
} from 'draft-js';
import Modal from './Modal';
import { Button } from 'reactstrap';

export default class extends PureComponent {

    static propTypes = {
        content: PropTypes.string,
        tokens: PropTypes.array
    };

    static defaultProps = {
        content: '%AlertLevel% Alert - %AlertName% - %ProductShortName%',
        tokens: ['AlertLevel', 'AlertName', 'HostName', 'ProductShortName']
    };


    constructor(props) {
        super(props);

        this.decorator = new CompositeDecorator([{
            strategy: (contentBlock, callback, contentState) => {
                const str = contentBlock.getText();
                props.tokens.forEach((token) => {
                    const regExp = new RegExp(`%${token}%`, 'gm');

                    let matchArr, start;
                    // eslint-disable-next-line
                    while ((matchArr = regExp.exec(str)) !== null) {
                        start = matchArr.index;
                        callback(start, start + matchArr[0].length);
                    }
                });
            },
            component: (props) => (<strong>{props.children}</strong>)
        }]);

        this.state = {
            editorState: EditorState.createWithContent(
                ContentState.createFromText(props.content),
                this.decorator
            )
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    toggleModal() {
        const updateState = { show: !this.state.show };
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

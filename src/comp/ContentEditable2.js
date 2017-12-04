import React, { PureComponent } from 'react';
import _ from 'lodash';
import ContentEditable from 'react-contenteditable';
import Modal from './Modal';
import { Button } from 'reactstrap';

const TOKENS = ['AlertLevel', 'AlertName', 'ProductShortName', 'HostName'];
const getHtmlContentsFromValue = (contents, tokens) => (
    _.reduce(tokens, (s, t) => (
        _.replace(s, new RegExp(`%${t}%`, 'gm'), s => `<b>${s}</b>`)
    ), contents.replace(/\r?\n/g, '<br/>'))
);

const INIT_HTML = '%AlertLevel% Alert - %AlertName% - %ProductShortName%';

export default class extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            html: INIT_HTML
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        const updateState = { show: !this.state.show };
        if (!this.state.show) { updateState.html = INIT_HTML; }
        this.setState(updateState);
    }

    handleChanged(evt) {
        this.setState({
            html: evt.target.value
        });
    }

    render() {
        const { title } = this.props;

        return (
            <section className='content-editable-sec'>
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
                    <ContentEditable
                        className='form-control'
                        html={getHtmlContentsFromValue(this.state.html, TOKENS)}
                        onChange={this.handleChanged}
                        />
                </Modal>
            </section>
        );
    }
}

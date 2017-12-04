import React, { PureComponent } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

export default class extends PureComponent {

    render() {
        const { children, className, show, title, toggle } = this.props;

        return (
            <Modal className={className} isOpen={show} toggle={toggle}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody><section className='form-group'>{children}</section></ModalBody>
                <ModalFooter><Button outline onClick={toggle}>Close</Button></ModalFooter>
            </Modal>
        );
    }
}

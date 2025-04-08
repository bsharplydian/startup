import { Toast, ToastContainer } from 'react-bootstrap';
import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function NotifToasts(props) {
    return (
        // <Modal {...props} show={props.message} centered>
        //     <Modal.Body>{props.message}</Modal.Body>
        //     <Modal.Footer>
        //         <Button onClick={props.onHide}>Close</Button>
        //     </Modal.Footer>
        // </Modal>
        <ToastContainer className="notif" position={'bottom-end'}>
            {props.messages.map((message, index) => {
                return (
                    <Toast show={message} onClose={() => props.onHide(index)}>
                        <Toast.Header>
                            <strong className="me-auto">Update</strong>
                        </Toast.Header>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>
                )
            })}
        </ToastContainer>
    );
}

import { Toast, ToastContainer } from 'react-bootstrap';
import React from 'react';
import { GameEvent } from './gameNotifier';

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
        <ToastContainer className="notif-box" position={'bottom-end'}>
            {props.messages.map((message, index) => {
                return (
                    <Toast className="notif" key={index} show={message} onClose={() => props.onHide(index)}>
                        <Toast.Header>
                            <strong className="me-auto">{message?.value?.gamename}</strong>
                        </Toast.Header>
                        <Toast.Body>{message?.type == GameEvent.Join ? `${message?.from} has added ${message?.value?.characterName}` : `${message?.from} has removed ${message?.value?.characterName}`}</Toast.Body>
                    </Toast>
                )
            })}
        </ToastContainer>
    );
}

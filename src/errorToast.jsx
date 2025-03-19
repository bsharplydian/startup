import { Toast } from 'react-bootstrap';
import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ErrorToast(props) {
    return (
        // <Modal {...props} show={props.message} centered>
        //     <Modal.Body>{props.message}</Modal.Body>
        //     <Modal.Footer>
        //         <Button onClick={props.onHide}>Close</Button>
        //     </Modal.Footer>
        // </Modal>
        <Toast className="error" show={props.message} onClose={props.onHide}>
            <Toast.Header>
                <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    );
}

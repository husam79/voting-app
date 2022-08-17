import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MsgBox({ title, body, type = "close", show, onHide }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>إغلاق</Button>
            </Modal.Footer>
        </Modal>
    );
}

/* function App() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}




export default function MsgBox({ isVisible, title, body, type = "close", onAction }) {
    return (
        <>
            {isVisible &&
                <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="modalTitle" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalTitle">{title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {body}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onAction('close')}>إغلاق</button>
                                {type !== 'ok' && <button type="button" className="btn btn-primary">Save changes</button>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
} */
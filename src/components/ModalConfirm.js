import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../services/UserServices';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success('delete succes');
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error('error delete');
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Detele A user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-name">
                        Are you sure to delete user!! Do you want to delete this use, <br />
                        <b> email = {dataUserDelete.email} </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalConfirm;

import { Modal, Button } from "react-bootstrap";

const ModalComponent = ({ showModal, handleClose, imageUrl }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Giphy image</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img src={imageUrl} style={{ maxWidth: "100%" }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;

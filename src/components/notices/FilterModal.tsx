import React from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Filter Modal">
      <div>
        <h2>Modal Title</h2>
        <p>Modal Content Goes Here</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default FilterModal;

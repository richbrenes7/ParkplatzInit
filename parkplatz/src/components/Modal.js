import React from 'react';
import '../styles/Modal.css';

const Modal = ({ image, onClose }) => {
    if (!image) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <img src={image} alt="Foto de la visita" className="modal-image" />
                <button onClick={onClose} className="modal-close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;

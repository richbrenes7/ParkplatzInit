import React from 'react';

function PhotoModal({ image }) {
  return (
    <div className="modal fade" id="photoModal" tabIndex="-1" role="dialog" aria-labelledby="photoModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="photoModalLabel">Foto del Visitante</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={image} alt="Foto del visitante" className="img-fluid" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoModal;

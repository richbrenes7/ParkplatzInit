import React from 'react';

function Resident() {
  const handleResidentFormSubmit = (e) => {
    e.preventDefault();
    // Your logic for handling resident form submission.
  };

  return (
    <div className="resident-form">
      <form onSubmit={handleResidentFormSubmit}>
        <label>Nº departamento</label>
        <input type="text" id="numberDeptResident" required />
        <label>Nombre</label>
        <input type="text" id="nameResident" required />
        <label>Otro residente</label>
        <input type="text" id="resident2" required />
        <label>Correo electrónico</label>
        <input type="text" id="emailResident" required />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Resident;

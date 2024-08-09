import React from 'react';

function Visitor() {
  const handleVisitorFormSubmit = (e) => {
    e.preventDefault();
    // Your logic for handling visitor form submission.
  };

  return (
    <div className="visitor-form">
      <form onSubmit={handleVisitorFormSubmit}>
        <label>Departamento a visitar</label>
        <input type="text" id="toWhoVisitor" required />
        <label>Nombre del visitante</label>
        <input type="text" id="nameVisitor" required />
        <label>RUT del visitante</label>
        <input type="text" id="rutVisitor" required />
        <label>Número de acompañantes</label>
        <input type="text" id="numCompanionsVisitor" required />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default Visitor;

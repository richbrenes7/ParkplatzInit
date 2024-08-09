import React from 'react';

function ListVisitors() {
  // You can fetch the visitor data and map it to a list here.

  return (
    <div className="visitor-list">
      {/* List visitors here */}
      <table>
        <thead>
          <tr>
            <th>Depto a visitar</th>
            <th>Nombre Visitante</th>
            <th>Rut</th>
            <th>N° Acompañantes</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {/* Map the visitor data to table rows here */}
        </tbody>
      </table>
    </div>
  );
}

export default ListVisitors;

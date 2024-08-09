import React from 'react';

function Sidebar({ setView }) {
  return (
    <div className="sidebar">
      <button onClick={() => setView('Visitor')}>Ingresar Visitantes</button>
      <button onClick={() => setView('Resident')}>Ingresar Residentes</button>
      <button onClick={() => setView('ListVisitors')}>Lista de Visitantes</button>
    </div>
  );
}

export default Sidebar;

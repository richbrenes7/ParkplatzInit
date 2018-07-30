window.view = {};

// escritura de datos de visitante
window.view.visitor = () => {
  let divVisitor = document.getElementById('container');
  divVisitor.innerHTML =
    `<input id="toWhoVisitor" type="text" placeholder="Nº Depto">
    <button type="button" id="btnSearchResidentVisitor">OK</button>
    <input id="nameResidentVisitor" type="text" placeholder="Nombre a quien visita">
    <input id="nameVisitor" type="text" placeholder="Nombre">
    <input id="rutVisitor" type="text" placeholder="Rut">

    <button type="button" id="btnDataVisitor" onclick="window.controller.dataInformationVisitor()">Guardar</button>`;
};


// escritura de datos de residentes 
window.view.resident = () => {
  let divResident = document.getElementById('container');
  divResident.innerHTML =
    `<input id="numberDeptResident" type="text" placeholder="Nº departamento">
    <input id="nameResident" type="text" placeholder="Nombre">
    <input id="emailResident" type="text" placeholder="Correo electronico">
    <button type="button" id="btnDataResident" onclick="window.controller.dataInformationResident()">Guardar</button>`;
};

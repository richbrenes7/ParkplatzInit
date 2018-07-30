window.view = {};

// escritura de datos de visitante
window.view.visitor = () => {
  let divVisitor = document.getElementById('container');
  divVisitor.innerHTML =
    `<input id="toWhoVisitor" type="text" placeholder="Nº Depto">
    <button type="button" id="btnSearchResidentVisitor" onclick="window.controller.dataNumberResident()">OK</button>
      <input id="nameResidentVisitor" type="text" placeholder="Nombre a quien visita">
      <input id="nameVisitor" type="text" placeholder="Nombre">
      <input id="rutVisitor" type="text" placeholder="Rut">
      <input id="phoneVisitor" type="text" placeholder="Telefono">
      <input id="numCompanionsVisitor" type="text" placeholder="Nº Acompañantes">
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


// escritura datos visitantes en tabla
window.view.listVisitors = () => {
  let htmlListVisitors =
    `<table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col" class="text-center">Depto a visitar</th>
        <th scope="col" class="text-center">Nombre Residente</th>
        <th scope="col" class="text-center">Nombre Visitante</th>
        <th scope="col" class="text-center">Rut</th>
        <th scope="col" class="text-center">N° Acompañantes</th>
        <th scope="col" class="text-center">Fecha</th>
        <th scope="col" class="text-center">Hora</th>
      </tr>
  </thead>`;
  const allVisitors = window.controller.tableCollectionVisitors();
  allVisitors.then(visitors => {
    visitors.forEach(visitor => {
      const vis = visitor.data();

      // formato fecha
      const optionsDate = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      let dateFormat = vis.date.toDate();
      let date = dateFormat.toLocaleDateString('es-CL', optionsDate);

      // formato hora
      const optionsHour = {
        hour: 'numeric',
        minute: 'numeric'
      };
      let hour = dateFormat.toLocaleTimeString('es-CL', optionsHour);


      htmlListVisitors +=
        `<tbody>
        <tr>
          <td>${vis.numberDept}</td>
          <td>${vis.nameResident}</td>
          <td>${vis.name}</td>
          <td>${vis.rut}</td>
          <td>${vis.companions}</td>
          <td>${date}</td>
          <td>${hour}</td>
        </tr>
      </tbody>
      `;
    });
    let divListVisitors = document.getElementById('container');
    divListVisitors.innerHTML = htmlListVisitors + '</table>';
  });
};


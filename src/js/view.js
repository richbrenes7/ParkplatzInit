window.view = {};


// escritura de datos de visitante
window.view.visitor = () => {
  let divVisitor = document.getElementById('container');
  divVisitor.innerHTML =
    `<!--Registro del visitante y confirmación del departamento a ingresar-->
      <div class="container mt-2 mb-2" id="registry">
        <!--Confirmación del departamento-->
        <div class="container" id="apartmentNumber">
          <label for="toWhoVisitor" class="mt-2">Departamento a visitar</label>
          <input type="text" id="toWhoVisitor" placeholder="Ingrese departamento">
          <p class="mb-0">Nombre residente: </p>
          <input id="nameResidentVisitor" type="text" placeholder="Residente">
        </div>
        <div>
          <div class="row justify-content-center">
            <button class="button-photo p-3 mt-2 mb-2" id="btnSearchResidentVisitor" onclick="window.controller.dataNumberResident()">Mostrar residentes</button>
          </div>
        </div>
        <!--Foto del visitante-->
        <div class="container" id="visitorPhoto">
          <div class="row justify-content-center">
            <video class="mt-2" id="player" width=320 height=240 autoplay></video>
            <canvas class="mt-2 mb-2" id="snapshot" width=320 height=240></canvas>
          </div>
          <div class="row justify-content-center">
            <button class="button-photo mr-1" id="capture">Sacar foto</button>
            <button class="button-photo ml-1" id="newCapture">Otra Foto</button>
          </div>
        </div>
        <!--Datos del visitante-->
        <div class="container" id="visitorData">
          <label for="nameVisitor" class="mt-2">Nombre del visitante</label>
          <input type="text" id="nameVisitor" placeholder="Nombre">

          <label for="rutVisitor">RUT del visitante</label>
          <input type="text" id="rutVisitor" placeholder="RUT">

          <label for="numCompanionsVisitor">Número de acompañantes</label>
          <input type="text" id="numCompanionsVisitor" placeholder="Numero">
        </div>
        <div>
          <div class="row justify-content-center">
            <button class="button-photo p-3 mt-2" id="btnDataVisitor" onclick="window.controller.dataInformationVisitor()">Agregar</button>
          </div>
        </div>
      </div>`;
};


// escritura de datos de residentes 
window.view.resident = () => {
  let divResident = document.getElementById('container');
  divResident.innerHTML =
    `<input id="numberDeptResident" type="text" placeholder="Nº departamento">
      <input id="nameResident" type="text" placeholder="Nombre">
      <input id="resident2" type="text" placeholder="Otro residente">
      <input id="resident3" type="text" placeholder="Otro residente">
      <input id="resident4" type="text" placeholder="Otro residente">
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
        <th scope="col" class="text-center">Foto</th>
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
          <td><img src="${vis.image}" alt=""></td>
        </tr>
      </tbody>
      `;
    });
    let divListVisitors = document.getElementById('container');
    divListVisitors.innerHTML = htmlListVisitors + '</table>';
  });
};


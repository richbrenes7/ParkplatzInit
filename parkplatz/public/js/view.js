window.view = {};


// escritura de datos de visitante
window.view.visitor = () => {
  let divVisitor = document.getElementById('container');
  divVisitor.innerHTML =
    `<!--Registro del visitante y confirmación del departamento a ingresar-->
    <div class="row justify-content-center">
    <div class="col-lg-10 bg-white rounded containerTransparent"> 
    <p class="lead titlePage mt-4">Registro Visitantes</p>
      <div class="container mt-2 mb-2" id="registry">
        <!--Confirmación del departamento-->
        <div class="container" id="apartmentNumber">
          <label for="toWhoVisitor" class="mt-2 colorTextLabel">Departamento a visitar</label>
          <input type="text" id="toWhoVisitor" placeholder="Ingrese departamento" requeried>
          <div id="insertResident"></div>
        </div>
        <div>
          <div class="row justify-content-center">
            <button class="button-photo p-3 mt-2 mb-2 btn btn-warning text-white shadowStyle" id="btnSearchResidentVisitor" onclick="window.controller.infoResident()">Mostrar residentes</button>
          </div>
        </div>
        <div id="containerModal"></div>
        <!--Foto del visitante-->
        <div class="row justify-content-center">
            <video class="mt-2" id="player" width=320 height=240 autoplay></video>
            <canvas class="mt-2 mb-2" id="snapshot" width=320 height=240></canvas>
        </div>
          <div class="row justify-content-center">
            <button class="mr-1 btn btn-warning text-white shadowStyle" id="capture">Sacar foto</button>
            <button class="ml-1 btn btn-warning text-white shadowStyle" id="newCapture">Otra Foto</button>
          </div>
        </div>
        <!--Datos del visitante-->
        <div class="container" id="visitorData">
          <label for="nameVisitor" class="mt-2 colorTextLabel">Nombre del visitante</label>
          <input type="text" id="nameVisitor" placeholder="Nombre Visitante" required>

          <label for="rutVisitor" class="colorTextLabel">DPI del visitante</label>
          <input type="text" id="rutVisitor" placeholder="DPI" required>

          <label for="numCompanionsVisitor" class="colorTextLabel">Número de acompañantes</label>
          <input type="text" id="numCompanionsVisitor" placeholder="Número" required>
        </div>
        <div>
          <div class="row justify-content-center">
            <button class=" p-3 mt-2 btn btn-warning text-white shadowStyle" id="btnDataVisitor" onclick="window.controller.dataInformationVisitor()">Agregar</button>
          </div>
        </div>
        </div> 
      </div>
      </div>`;
};


// escritura de datos de residentes 
window.view.resident = () => {
  let divResident = document.getElementById('container');
  divResident.innerHTML =
    `<div class="row justify-content-center">
    <div class="bg-white p-4 col-lg-10 rounded containerTransparent">
    <p class="lead titlePage mt-4">Registro Residentes</p>
      <input id="numberDeptResident" type="text" placeholder="Nº departamento">
      <input id="nameResident" type="text" placeholder="Nombre">
      <input id="resident2" type="text" placeholder="Otro residente">
      <input id="resident3" type="text" placeholder="Otro residente">
      <input id="resident4" type="text" placeholder="Otro residente">
      <input id="emailResident" type="text" placeholder="Correo electrónico">
      <button type="button" id="btnDataResident" class="btn btn-warning text-white shadowStyle" onclick="window.controller.dataInformationResident()">Guardar</button>
      </div>
      </div>`;
};


// escritura datos visitantes en tabla
window.view.listVisitors = () => {
  let htmlListVisitors =
    `<div class="contTable">
    <table class="table table-bordered table-hover bg-white tableStyle">
    <thead class="colorTable">
      <tr>
        <th scope="col" class="text-center text-white lead">Depto a visitar</th>
        <th scope="col" class="text-center text-white lead">Nombre Visitante</th>
        <th scope="col" class="text-center text-white lead">Rut</th>
        <th scope="col" class="text-center text-white lead">N° Acompañantes</th>
        <th scope="col" class="text-center text-white lead">Fecha</th>
        <th scope="col" class="text-center text-white lead">Hora</th>
        <th scope="col" class="text-center text-white lead">Foto</th>
      </tr>
  </thead>`;
  const allVisitors = window.controller.tableCollectionVisitors();
  allVisitors.then(visitors => {
    visitors.forEach(visitor => {
      const vis = visitor.data();

      // formato fecha
      const optionsDate = {
        // weekday: 'short',
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
      <td class="text-center">${vis.numberDept}</td>
      <td class="text-center">${vis.name}</td>
      <td class="text-center">${vis.rut}</td>
      <td class="text-center">${vis.companions}</td>
      <td class="text-center">${date}</td>
      <td class="text-center">${hour}</td>
      <td class="text-center"><button class="btn btn-warning text-white shadowStyle" data-toggle="modal" data-target="#exampleModalPhoto" onclick="window.view.photoVisitModal('${vis.image}')">Ver</button></td>
      </tr>
      </tbody>`;
    });
    let divListVisitors = document.getElementById('container');
    divListVisitors.innerHTML = htmlListVisitors +
      '</table> </div>';
  });
};


// modal foto visitante
window.view.photoVisitModal = (image) => {
  let modalPhotoVisit = document.getElementById('containerPhoto');
  modalPhotoVisit.innerHTML =
    `<div class="modal fade" id="exampleModalPhoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title text-center" id="exampleModalLabel1">Foto Visitante</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body ">
  <img src="${image}" class="img-fluid imgStyle" alt="Fotografia Visitante">
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-warning text-white shadowStyle" data-dismiss="modal">Cerrar</button>
  </div>
  </div>
  </div>
  </div>`;
};


// agrega los residentes de un departamento
window.view.insertResident = (dataRes) => {
  let divInsertResident = document.getElementById('insertResident');
  divInsertResident.innerHTML =
    `<div class="container containerResidentDato">
  <label for="Residents" class="mt-2 colorTextLabel">Residentes</label>
  <p>Residente: ${dataRes.nameResident}</p>
  <p>Residente: ${dataRes.resident2}</p>
  <p>Residente: ${dataRes.resident3}</p>
  <p>Residente: ${dataRes.resident4}</p>
</div>`;
};
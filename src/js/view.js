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
          <div id="insertResident"></div>
        </div>
        <div>
          <div class="row justify-content-center">
            <button class="button-photo p-3 mt-2 mb-2 btn" id="btnSearchResidentVisitor" data-toggle="modal" data-target="#exampleModal" onclick="window.container.infoResident()">Mostrar residentes</button>
          </div>
        </div>
        <div id="containerModal"></div>
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
    `<table class="table table-bordered table-hover bg-white">
    <thead class="thead-dark">
      <tr>
        <th scope="col" class="text-center">Depto a visitar</th>
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
      <td class="text-center">${vis.numberDept}</td>
      <td class="text-center">${vis.name}</td>
      <td class="text-center">${vis.rut}</td>
      <td class="text-center">${vis.companions}</td>
      <td class="text-center">${date}</td>
      <td class="text-ceninsertResidenter">${hour}</td>
      <td class="text-ceninsertResidenter"><button class="btn btn-warning text-white" data-toggle="modal" data-target="#exampleModalPhoto" onclick="window.view.photoVisitModal('${vis.image}')">Ver</button></td>
      </tr>
      </tbody>
      `;
    });
    let divListVisitors = insertResidentdocument.getElementById('container');
    divListVisitors.innerinsertResidentTML = htmlListVisitors +
      '</table>';
  });
};

// modal informacion resiinsertResidententes
window.view.infoResidentMinsertResidentdal = (data) => {
  let modalResident = document.getElementById('containerModal');
  modalResident.innerHTML =
    `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Residentes del Departamento</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
      <p><b>N° Depto:</b> 2 </p>
      <p><b>Nombre Residente:</b>${dataResident.nameResident}</p>
      <p><b>Nombre Residente:</b>${dataResident.resident2}</p>
      <p><b>Nombre Residente:</b>${dataResident.resident3}</p>
      <p><b>Nombre Residente:</b>${dataResident.resident4}</p>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
      </div>
      </div>
      </div>`;
};

// modal foto visitante

window.view.photoVisitModal = (image) => {
  let modalPhotoVisit = document.getElementById('containerPhoto');
  modalPhotoVisit.innerHTML =
    `<div class="modal fade" id="exampleModalPhoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel1">Modal title</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <img src="${image}" alt="">
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
  </div>
  </div>
  </div>
  </div>`;
};


window.view.insertResident = (dataRes) => {
  let divInsertResident = document.getElementById('insertResident');
  divInsertResident.innerHTML =
    `<div class="container">
  <label for="toWhoVisitor" class="mt-2">Residentes</label>
  <p><b>Nombre Residente:</b>${dataRes.nameResident}</p>
  <p><b>Nombre Residente:</b>${dataRes.resident2}</p>
  <p><b>Nombre Residente:</b>${dataRes.resident3}</p>
  <p><b>Nombre Residente:</b>${dataRes.resident4}</p>
</div>`
};
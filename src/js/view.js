window.view = {};

// escritura de datos de visitante
window.view.visitor = () => {
  let divVisitor = document.getElementById('container');
  divVisitor.innerHTML =
  `<input id="toWhoVisitor" type="text" placeholder="Nº Depto">
  <button type="button" id="btnSearchResidentVisitor" class="btn" data-toggle="modal" data-target="#exampleModal" onclick="window.controller.dataNumberResident()">OK</button>
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
  `<table class="table table-bordered table-hover bg-white">
  <thead class="thead-dark">
  <tr>
  <th scope="col" class="text-center lead">Depto</th>
  <th scope="col" class="text-center lead">Residente</th>
  <th scope="col" class="text-center lead">Visitante</th>
  <th scope="col" class="text-center lead">Rut</th>
  <th scope="col" class="text-center lead">N° Acomp.</th>
  <th scope="col" class="text-center lead">Fecha</th>
  <th scope="col" class="text-center lead">Hora</th>
  <th scope="col" class="text-center lead">Foto</th>
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
      <td class="text-center">${vis.nameResident}</td>
      <td class="text-center">${vis.name}</td>
      <td class="text-center">${vis.rut}</td>
      <td class="text-center">${vis.companions}</td>
      <td class="text-center">${date}</td>
      <td class="text-center">${hour}</td>
      <td class="text-center"><button class="btn btn-warning text-white" data-toggle="modal" data-target="#exampleModalPhoto" onclick="window.view.photoVisitModal()">Ver</button></td>
      </tr>
      </tbody>
      `;
    });
    let divListVisitors = document.getElementById('container');
    divListVisitors.innerHTML = htmlListVisitors + '</table>';
  });
};

// modal informacion residentes

window.view.infoResidentModal = () =>{
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
  <p><b>Nombre Residente:</b> Valeria</p>
  <p><b>Nombre Residente:</b> Simona</p>
  <p><b>Nombre Residente:</b> Tigrito</p>
  <p><b>Nombre Residente:</b> Raul</p>
  <p><b>Nombre Residente:</b> Jeicito</p>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
  </div>
  </div>
  </div>
  </div>`;
};

// modal foto visitante

window.view.photoVisitModal = () =>{
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
  <p>aqui va la foto</p>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
  </div>
  </div>
  </div>
  </div>`;
};
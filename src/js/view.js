window.view = {};

// Escritura de datos de visitante
window.view.visitor = () => {
  let divVisitor = document.getElementById('container');
  divVisitor.innerHTML = `
    <!--Registro del visitante y confirmación del departamento a ingresar-->
    <div class="row justify-content-center">
      <div class="col-lg-10 bg-white rounded containerTransparent"> 
        <p class="lead titlePage mt-4">Registro Visitantes</p>
        <div class="container mt-2 mb-2" id="registry">
          <!--Confirmación del departamento-->
          <div class="container" id="apartmentNumber">
            <label for="toWhoVisitor" class="mt-2 colorTextLabel">Departamento a visitar</label>
            <input type="text" id="toWhoVisitor" placeholder="Ingrese departamento" required>
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
              <canvas class="mt-2 mb-2" id="snapshot" width=320 height=240 style="display: none;"></canvas>
          </div>
          <div class="row justify-content-center">
              <button class="mr-1 btn btn-warning text-white shadowStyle" id="capture" onclick="window.view.captureAndValidate()">Sacar foto y Validar</button>
              <button class="ml-1 btn btn-warning text-white shadowStyle" id="newCapture" style="display: none;" onclick="window.view.resetCapture()">Otra Foto</button>
          </div>
          <!--Datos del visitante que se mostrarán solo si no hay visitas programadas-->
          <div class="container" id="visitorData" style="display: none;">
            <label for="nameVisitor" class="mt-2 colorTextLabel">Nombre del visitante</label>
            <input type="text" id="nameVisitor" placeholder="Nombre Visitante" required>

            <label for="numCompanionsVisitor" class="colorTextLabel">Número de acompañantes</label>
            <input type="text" id="numCompanionsVisitor" placeholder="Número" required>
          </div>
          <div>
            <div class="row justify-content-center">
              <button class="p-3 mt-2 btn btn-warning text-white shadowStyle" id="btnDataVisitor" style="display: none;" onclick="window.controller.dataInformationVisitor()">Agregar</button>
            </div>
          </div>
        </div> 
      </div>
    </div>`;

  // Llamar a performCapture después de que la vista ha sido renderizada
  window.controller.performCapture();
};

window.view.captureAndValidate = () => {
    const player = document.getElementById('player');
    const snapshotCanvas = document.getElementById('snapshot');
    const context = snapshotCanvas.getContext('2d');

    // Captura la imagen del video
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    player.style.display = 'none';
    snapshotCanvas.style.display = 'block';
    document.getElementById('newCapture').style.display = 'block';

    snapshotCanvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'visitor-document.png');

        fetch('http://localhost:8081/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos tras subir la imagen:', data);
            return fetch(`http://localhost:8081/api/validateDPI?dpi=${data.dpi}`, {
                method: 'GET'
            });
        })
        .then(response => response.json())
        .then(validationData => {
          console.log('Datos de validación recibidos:', validationData);
          if (validationData.status === 'found' || validationData.status === 'accepted') {
              console.log('Visita aceptada:', validationData.visitor);
              alert(`Visita aceptada exitosamente para ${validationData.visitor.name}. Estado de la visita: ${validationData.visitor.status}.`);
      
              // Limpiar campos y reiniciar la captura
              document.getElementById('toWhoVisitor').value = '';
              document.getElementById('visitorData').style.display = 'none';
              document.getElementById('btnDataVisitor').style.display = 'none';
      
              // Reiniciar la captura
              window.view.resetCapture();
              window.controller.performCapture();
          } else {
              console.log('No se encontró ninguna visita pendiente');
              alert('No se encontró ninguna visita pendiente. Complete los datos del visitante.');
              document.getElementById('visitorData').style.display = 'block';
              document.getElementById('btnDataVisitor').style.display = 'block';
          }
         })
      
        .catch((error) => {
            console.error('Error durante la subida de la imagen o la validación del DPI:', error);
            alert('Error al subir la imagen o al validar el DPI.');
        });
    });
};




// Método para reiniciar la captura
window.view.resetCapture = () => {
    const player = document.getElementById('player');
    const snapshotCanvas = document.getElementById('snapshot');

    player.style.display = 'block';
    snapshotCanvas.style.display = 'none';
    document.getElementById('newCapture').style.display = 'none';
    document.getElementById('visitorData').style.display = 'none';
    document.getElementById('btnDataVisitor').style.display = 'none';
};



// Método para capturar la imagen
window.view.captureImage = () => {
    const player = document.getElementById('player');
    const snapshotCanvas = document.getElementById('snapshot');
    const context = snapshotCanvas.getContext('2d');

    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    // Ocultar el video y mostrar la imagen capturada
    player.style.display = 'none';
    snapshotCanvas.style.display = 'block';
    document.getElementById('upload').style.display = 'block';
};

// Método para subir la imagen a Google Cloud Storage y validar el DPI
window.view.uploadImage = () => {
  const snapshotCanvas = document.getElementById('snapshot');
  snapshotCanvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'visitor-document.png');

      fetch('http://localhost:8081/upload', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
          console.log('Image uploaded successfully:', data);
          alert('Imagen subida con éxito');

          // Validar el DPI después de subir la imagen
          return fetch(`http://localhost:8081/api/validateDPI?dpi=${data.dpi}`, {
              method: 'GET'
          });
      })
      .then(response => response.json())
      .then(validationData => {
          if (validationData.status === 'found') {
              console.log('Visita encontrada:', validationData.visitor);
              alert('Visita pendiente encontrada. Se cambiará el estado a Aceptada.');
              // Aquí puedes hacer algo adicional si la visita fue encontrada
          } else {
              console.log('No se encontró ninguna visita pendiente');
              alert('No se encontró ninguna visita pendiente.');
              // Aquí puedes habilitar los campos para el registro manual
          }
      })
      .catch((error) => {
          console.error('Error during image upload or DPI validation:', error);
          alert('Error al subir la imagen o al validar el DPI.');
      });
  });
};


// Escritura de datos de residentes 
window.view.resident = () => {
  let divResident = document.getElementById('container');
  divResident.innerHTML = `
    <div class="row justify-content-center">
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

// Escritura de datos visitantes en tabla con opciones de aceptar/rechazar
window.view.listVisitors = () => {
  let htmlListVisitors = `
    <div class="contTable">
      <table class="table table-bordered table-hover bg-white tableStyle">
        <thead class="colorTable">
          <tr>
            <th scope="col" class="text-center text-white lead">Depto a visitar</th>
            <th scope="col" class="text-center text-white lead">Nombre Visitante</th>
            <th scope="col" class="text-center text-white lead">DPI</th>
            <th scope="col" class="text-center text-white lead">N° Acompañantes</th>
            <th scope="col" class="text-center text-white lead">Fecha</th>
            <th scope="col" class="text-center text-white lead">Hora</th>
            <th scope="col" class="text-center text-white lead">Foto</th>
            <th scope="col" class="text-center text-white lead">Estado</th>
            <th scope="col" class="text-center text-white lead">Acciones</th>
          </tr>
        </thead>`;
  
  const allVisitors = window.controller.tableCollectionVisitors();
  allVisitors.then(visitors => {
    visitors.forEach(visitor => {
      const data = visitor;

      // Formato de fecha y hora
      const date = new Date(data.date).toLocaleDateString('es-CL');
      const hour = new Date(data.date).toLocaleTimeString('es-CL');

      htmlListVisitors += `
      <tbody>
      <tr>
      <td class="text-center">${data.numberDept}</td>
      <td class="text-center">${data.name}</td>
      <td class="text-center">${data.dpi}</td>
      <td class="text-center">${data.companions}</td>
      <td class="text-center">${date}</td>
      <td class="text-center">${hour}</td>
      <td class="text-center"><button class="btn btn-warning text-white shadowStyle" data-toggle="modal" data-target="#exampleModalPhoto" onclick="window.view.photoVisitModal('${data.image}')">Ver</button></td>
      <td class="text-center">${data.status}</td>
      <td class="text-center">
        <button class="btn btn-success text-white shadowStyle" onclick="window.controller.updateVisitorStatus('${data._id}', 'Aceptada')">Aceptar</button>
        <button class="btn btn-danger text-white shadowStyle" onclick="window.controller.updateVisitorStatus('${data._id}', 'Rechazada')">Rechazar</button>
      </td>
      </tr>
      </tbody>`;
    });
    let divListVisitors = document.getElementById('container');
    divListVisitors.innerHTML = htmlListVisitors + '</table> </div>';
  });
};

// Modal foto visitante
window.view.photoVisitModal = (image) => {
  let modalPhotoVisit = document.getElementById('containerPhoto');
  modalPhotoVisit.innerHTML = `
    <div class="modal fade" id="exampleModalPhoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalLabel1">Foto Visitante</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="${image}" class="img-fluid imgStyle" alt="Fotografia Visitante"> <!-- Verifica que src="${image}" sea correcto -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning text-white shadowStyle" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>`;
};

// Agrega los residentes de un departamento
window.view.insertResident = (dataRes) => {
  let divInsertResident = document.getElementById('insertResident');
  divInsertResident.innerHTML = `
    <div class="container containerResidentDato">
      <label for="Residents" class="mt-2 colorTextLabel">Residentes</label>
      <p>Residente: ${dataRes.nameResident}</p>
      <p>Residente: ${dataRes.resident2}</p>
      <p>Residente: ${dataRes.resident3}</p>
      <p>Residente: ${dataRes.resident4}</p>
    </div>`;
};

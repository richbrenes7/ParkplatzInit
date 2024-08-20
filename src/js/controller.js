window.controller = {};

window.onload = () => {
  console.log("Cargando la vista de visitantes...");
  window.view.visitor();
  window.controller.performCapture();
};

// Lee datos (inputs) de visitantes
window.controller.dataInformationVisitor = () => {
  const toWhoVisitor = document.getElementById('toWhoVisitor').value;
  const nameVisitor = document.getElementById('nameVisitor').value;
  const dpiVisitor = document.getElementById('rutVisitor').value;
  const numCompanionsVisitor = document.getElementById('numCompanionsVisitor').value;

  let snapshotCanvas = document.getElementById('snapshot');
  let dataURL = snapshotCanvas.toDataURL(); // Captura la imagen como base64

  const dataVisitor = {
    date: new Date(),
    numberDept: toWhoVisitor,
    name: nameVisitor,
    dpi: dpiVisitor,
    companions: numCompanionsVisitor,
    image: dataURL
  };

  console.log("Datos del visitante a enviar:", dataVisitor);
  window.data.collectionDataVisitor(dataVisitor);

  // Limpiar los campos de entrada después de guardar los datos
  document.getElementById('toWhoVisitor').value = '';
  document.getElementById('nameVisitor').value = '';
  document.getElementById('rutVisitor').value = '';
  document.getElementById('numCompanionsVisitor').value = '';

  window.data.readCollectionVisitors();
};

// Lee datos (inputs) de residentes
window.controller.dataInformationResident = () => {
  const numberDeptResident = document.getElementById('numberDeptResident').value;
  const nameResident = document.getElementById('nameResident').value;
  const resident2 = document.getElementById('resident2').value;
  const resident3 = document.getElementById('resident3').value;
  const resident4 = document.getElementById('resident4').value;
  const emailResident = document.getElementById('emailResident').value;

  const dataResident = {
      numberDept: numberDeptResident,
      nameResident: nameResident,
      email: emailResident,
      resident2: resident2,
      resident3: resident3,
      resident4: resident4,
  };

  // Intentar directamente una operación PUT
  fetch(`/api/residents/${numberDeptResident}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataResident)
  })
  .then(response => {
      if (!response.ok) {
          // Si el residente no existe, lo creamos
          if (response.status === 404) {
              return fetch('/api/residents', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(dataResident)
              });
          } else {
              throw new Error('Error al actualizar residente');
          }
      }
      return response.json();
  })
  .then(data => {
      alert('Residente creado/actualizado correctamente.');
      console.log('Datos del residente guardados:', data);
  })
  .catch(error => {
      console.error('Error al crear/actualizar el residente:', error);
      alert('Hubo un error al crear/actualizar el residente. Por favor, inténtalo de nuevo.');
  });

  // Limpiar los campos de entrada después de guardar los datos
  document.getElementById('numberDeptResident').value = '';
  document.getElementById('nameResident').value = '';
  document.getElementById('emailResident').value = '';
  document.getElementById('resident2').value = '';
  document.getElementById('resident3').value = '';
  document.getElementById('resident4').value = '';
};


// Comunica data de colección de visitantes con escritura
window.controller.tableCollectionVisitors = () => {
  console.log("Recuperando datos de visitantes...");
  return window.data.readCollectionVisitors();
};

// Realizar captura de foto
window.controller.performCapture = () => {
  let player = document.getElementById('player');
  let snapshotCanvas = document.getElementById('snapshot');
  let captureButton = document.getElementById('capture');
  let newCapture = document.getElementById('newCapture');
  let videoTracks;

  let handleSuccess = (stream) => {
    console.log("Cámara activada");
    player.srcObject = stream;
    videoTracks = stream.getVideoTracks();
  };

  captureButton.addEventListener('click', () => {
    let context = snapshotCanvas.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    console.log("Foto capturada");

    // Detener todos los flujos de video
    videoTracks.forEach((track) => {
      track.stop();
    });
  });

  newCapture.addEventListener('click', () => {
    console.log("Tomando nueva captura");
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(handleSuccess);
  });

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(handleSuccess)
    .catch(error => {
      console.error("Error al activar la cámara:", error);
    });
};

// Obtener datos de residente
window.controller.infoResident = () => {
  console.log("Obteniendo datos de residentes...");
  window.data.getDataResident();
};

// Recarga de vista agregar visitante
window.controller.viewVisitor = () => {
  console.log("Cargando formulario de visitante...");
  window.view.visitor();
  window.controller.performCapture();
};

// Actualizar el estado de la visita
window.controller.updateVisitorStatus = (visitorId, status) => {
  fetch(`/api/visitors/${visitorId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al actualizar el estado de la visita');
    }
    return response.json();
  })
  .then(updatedVisitor => {
    alert(`Visita ${status.toLowerCase()} correctamente.`);
    window.controller.tableCollectionVisitors(); // Refresca la lista de visitas
  })
  .catch(error => {
    console.error('Error al actualizar el estado de la visita:', error);
  });
};

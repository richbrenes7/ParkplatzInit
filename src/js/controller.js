window.controller = {};

window.onload = () => {
  window.view.visitor();
  window.controller.performCapture();
};

// Lee datos (inputs) de visitantes
window.controller.dataInformationVisitor = () => {
  const toWhoVisitor = document.getElementById('toWhoVisitor').value;
  const nameVisitor = document.getElementById('nameVisitor').value;
  const dpiVisitor = document.getElementById('rutVisitor').value;  // Cambiado a 'dpiVisitor'
  const numCompanionsVisitor = document.getElementById('numCompanionsVisitor').value;

  let snapshotCanvas = document.getElementById('snapshot');
  let dataURL = snapshotCanvas.toDataURL(); // Captura la imagen como base64

  const dataVisitor = {
    date: new Date(),
    numberDept: toWhoVisitor,
    name: nameVisitor,
    dpi: dpiVisitor,  // Asegurarse de que el campo 'dpi' se guarda correctamente
    companions: numCompanionsVisitor,
    image: dataURL  // Guarda la imagen en base64
  };

  window.data.collectionDataVisitor(dataVisitor);

  // Limpiar los campos de entrada después de guardar los datos
  document.getElementById('toWhoVisitor').value = '';
  document.getElementById('nameVisitor').value = '';
  document.getElementById('rutVisitor').value = ''; // Este campo es para el 'dpi'
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

  window.data.collectionDataResident(dataResident);

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
    // Adjunta el flujo de video al elemento de video y autoplay
    player.srcObject = stream;
    videoTracks = stream.getVideoTracks();
  };

  captureButton.addEventListener('click', () => {
    let context = snapshotCanvas.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    // Detener todos los flujos de video
    videoTracks.forEach((track) => {
      track.stop();
    });
  });

  newCapture.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(handleSuccess);
  });

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(handleSuccess);
};

// Obtener datos de residente
window.controller.infoResident = () => {
  window.data.getDataResident();
};

// Recarga de vista agregar visitante
window.controller.viewVisitor = () => {
  window.view.visitor();
  window.controller.performCapture();
};

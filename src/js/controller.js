window.controller = {};

window.onload = () => {
  window.controller.performCapture();
};

// lee datos (inputs) de visitantes
window.controller.dataInformationVisitor = () => {
  let base64Url = '';

  const toWhoVisitor = document.getElementById('toWhoVisitor').value;
  const nameResidentVisitor = document.getElementById('nameResidentVisitor').value;
  const nameVisitor = document.getElementById('nameVisitor').value;
  const rutVisitor = document.getElementById('rutVisitor').value;
  const numCompanionsVisitor = document.getElementById('numCompanionsVisitor').value;

  const dataVisitor = {
    date: new Date(),
    numberDept: toWhoVisitor,
    nameResident: nameResidentVisitor,
    name: nameVisitor,
    rut: rutVisitor,
    companions: numCompanionsVisitor,
    base64Url: base64Url
  };

  window.data.collectionDataVisitor(dataVisitor);

  document.getElementById('toWhoVisitor').value = '';
  document.getElementById('nameResidentVisitor').value = '';
  document.getElementById('nameVisitor').value = '';
  document.getElementById('rutVisitor').value = '';
  document.getElementById('numCompanionsVisitor').value = '';

  window.data.readCollectionVisitors();
};


// busca dato de residentes según num depto
window.controller.dataNumberResident = () => {
  const toWhoVisitor = document.getElementById('toWhoVisitor').value;
  window.data.getDataResident(toWhoVisitor);
};


// lee datos (inputs) de residentes
window.controller.dataInformationResident = () => {
  const numberDeptResident = document.getElementById('numberDeptResident').value;
  const nameResident = document.getElementById('nameResident').value;
  const emailResident = document.getElementById('emailResident').value;

  const dataResident = {
    numberDept: numberDeptResident,
    nameResident: nameResident,
    email: emailResident
  };
  window.data.collectionDataResident(dataResident);

  document.getElementById('numberDeptResident').value = '';
  document.getElementById('nameResident').value = '';
  document.getElementById('emailResident').value = '';
};


// escribir nombre residente guardado
window.controller.completeNameResident = (nameResident) => {
  document.getElementById('nameResidentVisitor').value = nameResident;
};


// comunica data de colleccion de visitantes con escritura
window.controller.tableCollectionVisitors = () => {
  return window.data.readCollectionVisitors();
};


// realizar captura de foto
window.controller.performCapture = () => {
  let player = document.getElementById('player');
  let snapshotCanvas = document.getElementById('snapshot');
  let captureButton = document.getElementById('capture');
  let newCapture = document.getElementById('newCapture');
  let videoTracks;

  let handleSuccess = (stream) => {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
    videoTracks = stream.getVideoTracks();
  };

  captureButton.addEventListener('click', () => {
    let context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    let dataURL = snapshotCanvas.toDataURL();
    console.log('BASE 64:', dataURL);

    // Stop all video streams.
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
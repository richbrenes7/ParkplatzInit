window.controller = {};

window.onload = () => {
  window.view.visitor();
  window.controller.performCapture();
};


// lee datos (inputs) de visitantes
window.controller.dataInformationVisitor = () => {
  const toWhoVisitor = document.getElementById('toWhoVisitor').value;
  const nameVisitor = document.getElementById('nameVisitor').value;
  const rutVisitor = document.getElementById('rutVisitor').value;
  const numCompanionsVisitor = document.getElementById('numCompanionsVisitor').value;

  let snapshotCanvas = document.getElementById('snapshot');
  let dataURL = snapshotCanvas.toDataURL();

  const dataVisitor = {
    date: new Date(),
    numberDept: toWhoVisitor,
    name: nameVisitor,
    rut: rutVisitor,
    companions: numCompanionsVisitor,
    image: dataURL
  };

  window.data.collectionDataVisitor(dataVisitor);

  document.getElementById('toWhoVisitor').value = '';
  document.getElementById('nameVisitor').value = '';
  document.getElementById('rutVisitor').value = '';
  document.getElementById('numCompanionsVisitor').value = '';

  window.data.readCollectionVisitors();
};


// lee datos (inputs) de residentes
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

  document.getElementById('numberDeptResident').value = '';
  document.getElementById('nameResident').value = '';
  document.getElementById('emailResident').value = '';
  document.getElementById('resident2').value = '';
  document.getElementById('resident3').value = '';
  document.getElementById('resident4').value = '';
};


// comunica data de colleccion de visitantes con escritura
window.controller.tableCollectionVisitors = () => {
  // Esto ahora llama a la función que usa fetch en lugar de Firebase
  window.data.readCollectionVisitors()
      .then(allVisitors => {
          window.view.listVisitors(allVisitors);  // Pasa los datos obtenidos a la vista
      })
      .catch(error => {
          console.error('Error fetching visitors: ', error);
      });
};


// realizar captura de foto
window.controller.performCapture = () => {
  let player = document.getElementById('player');
  let snapshotCanvas = document.getElementById('snapshot');
  let dataURL = snapshotCanvas.toDataURL(); // dataURL contiene la imagen en formato Base64
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
    // let dataURL = snapshotCanvas.toDataURL();
    // console.log('BASE 64:', dataURL);

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


// escribo residentes
window.controller.infoResident = () => {
  window.data.getDataResident();
};


// recarga de vista agregar visitante
window.controller.viewVisitor = () => {
  window.view.visitor();
  window.controller.performCapture();
};
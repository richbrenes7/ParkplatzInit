window.data = {};

// guardar collección de visitante
window.data.collectionDataVisitor = (dataVisitor) => {
  const firestore = firebase.firestore();
  const settings = { /* your settings... */
    timestampsInSnapshots: true
  };
  firestore.settings(settings);
  firestore.collection('visitors').add(dataVisitor)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};


// guardar collección de residente
window.data.collectionDataResident = (dataResident) => {
  const firestore = firebase.firestore();
  const settings = { /* your settings... */
    timestampsInSnapshots: true
  };
  firestore.settings(settings);

  let id = dataResident.numberDept;
  firestore.collection('resident').doc(id).set(dataResident);
};


// obtener documentos residentes
window.data.getDataResident = (id) => {
  const firestore = firebase.firestore(); const settings = { /* your settings... */
    timestampsInSnapshots: true
  };
  firestore.settings(settings);

  let docRef = firestore.collection('resident').doc(id);

  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log('Document data:', doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
};
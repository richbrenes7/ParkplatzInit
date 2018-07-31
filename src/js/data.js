window.data = {};


// guardar collección de visitante
window.data.collectionDataVisitor = (dataVisitor) => {
  const firestore = firebase.firestore();
  const settings = {
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
  const settings = {
    timestampsInSnapshots: true
  };
  firestore.settings(settings);

  let id = dataResident.numberDept;
  firestore.collection('resident').doc(id).set(dataResident);
};


// obtener documento residentes
window.data.getDataResident = (id) => {
  const firestore = firebase.firestore(); const settings = {
    timestampsInSnapshots: true
  };
  firestore.settings(settings);

  let docRef = firestore.collection('resident').doc(id);

  docRef.get().then((doc) => {
    if (doc.exists) {
      // console.log('Document data:', doc.data());

      window.view.infoResidentModal(doc.data());
    } else {
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
};


// obtener colección de visitantes 
window.data.readCollectionVisitors = () => {
  const firestore = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  firestore.settings(settings);
  return firestore.collection('visitors').orderBy('date', 'desc').limit(20).get().then((allVisitors) => {
    return allVisitors;
  });
};
window.data = {};

// Guardar colección de visitantes
window.data.collectionDataVisitor = (dataVisitor) => {
  fetch('/api/visitors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        numberDept: dataVisitor.numberDept,
        name: dataVisitor.name,
        dpi: dataVisitor.dpi, // Asegúrate de que este valor se envía correctamente
        companions: dataVisitor.companions,
        image: dataVisitor.image
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Visitor data saved with ID:', data.id);
  })
  .catch(error => {
    console.error('Error adding visitor data:', error);
  });
};


// Guardar colección de residentes
window.data.collectionDataResident = (dataResident) => {
  const id = dataResident.numberDept;
  fetch(`/api/residents/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataResident)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Resident data updated with ID:', id);
  })
  .catch((error) => {
    console.error('Error updating resident data:', error);
  });
};

// Obtener documento residentes
window.data.getDataResident = () => {
  const numDepto = document.getElementById('toWhoVisitor').value;
  console.log(numDepto);

  fetch(`/api/residents/${numDepto}`)
    .then(response => response.json())
    .then(doc => {
      if (doc) {
        console.log('Resident data:', doc);
        window.view.insertResident(doc);
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting resident data:', error);
    });
};

// Obtener colección de visitantes
window.data.readCollectionVisitors = () => {
  return fetch('/api/visitors')
    .then(response => response.json())
    .then(allVisitors => {
      return allVisitors;
    })
    .catch((error) => {
      console.error('Error getting visitor data:', error);
    });
};

window.data = {};

// Guardar colección de visitantes
window.data.collectionDataVisitor = (dataVisitor) => {
  console.log("Enviando datos de visitante:", dataVisitor);
  fetch('/api/visitors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataVisitor)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Visitor data saved with ID:', data.id);
  })
  .catch(error => {
    console.error('Error adding visitor data:', error);
  });
};

// Guardar colección de residentes
// Guardar o actualizar la colección de residentes
window.data.collectionDataResident = async (dataResident) => {
  const id = dataResident.numberDept;
  console.log("Actualizando datos del residente con ID:", id);

  try {
    // Intentar actualizar el residente
    let response = await fetch(`/api/residents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataResident)
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Si el residente no existe, intentar crear uno nuevo
        console.log('Residente no encontrado, creando nuevo residente');
        response = await fetch('/api/residents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataResident)
        });
      } else {
        throw new Error(`Error al actualizar residente: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('Resident data saved with ID:', id);
  } catch (error) {
    console.error('Error saving resident data:', error);
  }
};

// Obtener documento residentes
window.data.getDataResident = () => {
  const numDepto = document.getElementById('toWhoVisitor').value;
  console.log("Buscando residente para el departamento:", numDepto);

  fetch(`/api/residents/${numDepto}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al obtener datos del residente: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(doc => {
      if (doc && doc.length > 0) {
        console.log('Resident data:', doc);
        window.view.insertResident(doc[0]); // Inserta el primer residente encontrado
      } else {
        console.log('No se encontró el documento!');
      }
    })
    .catch((error) => {
      console.log('Error getting resident data:', error);
      alert('Hubo un problema al obtener los datos del residente. Por favor, inténtalo de nuevo.');
    });
};



// Obtener colección de visitantes
window.data.readCollectionVisitors = () => {
  console.log("Recuperando la lista de visitantes...");
  return fetch('/api/visitors')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al obtener la lista de visitantes: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(allVisitors => {
      console.log("Lista de visitantes recibida:", allVisitors);
      return allVisitors;
    })
    .catch((error) => {
      console.error('Error getting visitor data:', error);
    });
};

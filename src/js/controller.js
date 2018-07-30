window.controller = {};

// lee datos (inputs) de visitantes
window.controller.dataInformationVisitor = () => {
  const toWhoVisitor = document.getElementById('toWhoVisitor').value;
  const nameResidentVisitor = document.getElementById('nameResidentVisitor').value;
  const nameVisitor = document.getElementById('nameVisitor').value;
  const rutVisitor = document.getElementById('rutVisitor').value;
  const phoneVisitor = document.getElementById('phoneVisitor').value;
  const numCompanionsVisitor = document.getElementById('numCompanionsVisitor').value;

  const dataVisitor = {
    date: new Date(),
    numberDept: toWhoVisitor,
    nameResident: nameResidentVisitor,
    name: nameVisitor,
    rut: rutVisitor,
    phone: phoneVisitor,
    companions: numCompanionsVisitor
  };
  window.data.collectionDataVisitor(dataVisitor);
  document.getElementById('toWhoVisitor').value = '';
  document.getElementById('nameResidentVisitor').value = '';
  document.getElementById('nameVisitor').value = '';
  document.getElementById('rutVisitor').value = '';
  document.getElementById('phoneVisitor').value = '';
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
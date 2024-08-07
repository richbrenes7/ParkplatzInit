/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/***/ (() => {

eval("window.controller = {};\nwindow.onload = () => {\n  window.view.visitor();\n  window.controller.performCapture();\n};\n\n// lee datos (inputs) de visitantes\nwindow.controller.dataInformationVisitor = () => {\n  const toWhoVisitor = document.getElementById('toWhoVisitor').value;\n  const nameVisitor = document.getElementById('nameVisitor').value;\n  const rutVisitor = document.getElementById('rutVisitor').value;\n  const numCompanionsVisitor = document.getElementById('numCompanionsVisitor').value;\n  let snapshotCanvas = document.getElementById('snapshot');\n  let dataURL = snapshotCanvas.toDataURL();\n  const dataVisitor = {\n    date: new Date(),\n    numberDept: toWhoVisitor,\n    name: nameVisitor,\n    rut: rutVisitor,\n    companions: numCompanionsVisitor,\n    image: dataURL\n  };\n  window.data.collectionDataVisitor(dataVisitor);\n  document.getElementById('toWhoVisitor').value = '';\n  document.getElementById('nameVisitor').value = '';\n  document.getElementById('rutVisitor').value = '';\n  document.getElementById('numCompanionsVisitor').value = '';\n  window.data.readCollectionVisitors();\n};\n\n// lee datos (inputs) de residentes\nwindow.controller.dataInformationResident = () => {\n  const numberDeptResident = document.getElementById('numberDeptResident').value;\n  const nameResident = document.getElementById('nameResident').value;\n  const resident2 = document.getElementById('resident2').value;\n  const resident3 = document.getElementById('resident3').value;\n  const resident4 = document.getElementById('resident4').value;\n  const emailResident = document.getElementById('emailResident').value;\n  const dataResident = {\n    numberDept: numberDeptResident,\n    nameResident: nameResident,\n    email: emailResident,\n    resident2: resident2,\n    resident3: resident3,\n    resident4: resident4\n  };\n  window.data.collectionDataResident(dataResident);\n  document.getElementById('numberDeptResident').value = '';\n  document.getElementById('nameResident').value = '';\n  document.getElementById('emailResident').value = '';\n  document.getElementById('resident2').value = '';\n  document.getElementById('resident3').value = '';\n  document.getElementById('resident4').value = '';\n};\n\n// comunica data de colleccion de visitantes con escritura\nwindow.controller.tableCollectionVisitors = () => {\n  return window.data.readCollectionVisitors();\n};\n\n// realizar captura de foto\nwindow.controller.performCapture = () => {\n  let player = document.getElementById('player');\n  let snapshotCanvas = document.getElementById('snapshot');\n  let captureButton = document.getElementById('capture');\n  let newCapture = document.getElementById('newCapture');\n  let videoTracks;\n  let handleSuccess = stream => {\n    // Attach the video stream to the video element and autoplay.\n    player.srcObject = stream;\n    videoTracks = stream.getVideoTracks();\n  };\n  captureButton.addEventListener('click', () => {\n    let context = snapshot.getContext('2d');\n    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);\n    // let dataURL = snapshotCanvas.toDataURL();\n    // console.log('BASE 64:', dataURL);\n\n    // Stop all video streams.\n    videoTracks.forEach(track => {\n      track.stop();\n    });\n  });\n  newCapture.addEventListener('click', () => {\n    navigator.mediaDevices.getUserMedia({\n      video: true\n    }).then(handleSuccess);\n  });\n  navigator.mediaDevices.getUserMedia({\n    video: true\n  }).then(handleSuccess);\n};\n\n// escribo residentes\nwindow.controller.infoResident = () => {\n  window.data.getDataResident();\n};\n\n// recarga de vista agregar visitante\nwindow.controller.viewVisitor = () => {\n  window.view.visitor();\n  window.controller.performCapture();\n};\n\n//# sourceURL=webpack://finalcore/./src/js/controller.js?");

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/***/ (() => {

eval("window.data = {};\n\n// guardar collección de visitante\nwindow.data.collectionDataVisitor = dataVisitor => {\n  const firestore = firebase.firestore();\n  const settings = {\n    timestampsInSnapshots: true\n  };\n  firestore.settings(settings);\n  firestore.collection('visitors').add(dataVisitor).then(docRef => {\n    console.log('Document written with ID: ', docRef.id);\n  }).catch(error => {\n    console.error('Error adding document: ', error);\n  });\n};\n\n// guardar collección de residente\nwindow.data.collectionDataResident = dataResident => {\n  const firestore = firebase.firestore();\n  const settings = {\n    timestampsInSnapshots: true\n  };\n  firestore.settings(settings);\n  let id = dataResident.numberDept;\n  firestore.collection('resident').doc(id).set(dataResident);\n};\n\n// obtener documento residentes\nwindow.data.getDataResident = () => {\n  let numDepto = document.getElementById('toWhoVisitor').value;\n  console.log(numDepto);\n  const firestore = firebase.firestore();\n  const settings = {\n    timestampsInSnapshots: true\n  };\n  firestore.settings(settings);\n  let docRef = firestore.collection('resident').doc(numDepto);\n  docRef.get().then(doc => {\n    if (doc.exists) {\n      console.log('Document data:', doc.data());\n      window.view.insertResident(doc.data());\n    } else {\n      console.log('No such document!');\n    }\n  }).catch(error => {\n    console.log('Error getting document:', error);\n  });\n};\n\n// obtener colección de visitantes \nwindow.data.readCollectionVisitors = () => {\n  const firestore = firebase.firestore();\n  const settings = {\n    timestampsInSnapshots: true\n  };\n  firestore.settings(settings);\n  return firestore.collection('visitors').orderBy('date', 'desc').limit(20).get().then(allVisitors => {\n    return allVisitors;\n  });\n};\n\n//# sourceURL=webpack://finalcore/./src/js/data.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ \"./src/js/data.js\");\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_data_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ \"./src/js/view.js\");\n/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_view_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller.js */ \"./src/js/controller.js\");\n/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_controller_js__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconsole.log('App initialized');\nconst port = process.env.PORT || 8080;\napp.listen(port, () => {\n  console.log('Hello world listening on port', port);\n});\n\n//# sourceURL=webpack://finalcore/./src/js/index.js?");

/***/ }),

/***/ "./src/js/view.js":
/*!************************!*\
  !*** ./src/js/view.js ***!
  \************************/
/***/ (() => {

eval("window.view = {};\n\n// escritura de datos de visitante\nwindow.view.visitor = () => {\n  let divVisitor = document.getElementById('container');\n  divVisitor.innerHTML = `<!--Registro del visitante y confirmación del departamento a ingresar-->\n    <div class=\"row justify-content-center\">\n    <div class=\"col-lg-10 bg-white rounded containerTransparent\"> \n    <p class=\"lead titlePage mt-4\">Registro Visitantes</p>\n      <div class=\"container mt-2 mb-2\" id=\"registry\">\n        <!--Confirmación del departamento-->\n        <div class=\"container\" id=\"apartmentNumber\">\n          <label for=\"toWhoVisitor\" class=\"mt-2 colorTextLabel\">Departamento a visitar</label>\n          <input type=\"text\" id=\"toWhoVisitor\" placeholder=\"Ingrese departamento\" requeried>\n          <div id=\"insertResident\"></div>\n        </div>\n        <div>\n          <div class=\"row justify-content-center\">\n            <button class=\"button-photo p-3 mt-2 mb-2 btn btn-warning text-white shadowStyle\" id=\"btnSearchResidentVisitor\" onclick=\"window.controller.infoResident()\">Mostrar residentes</button>\n          </div>\n        </div>\n        <div id=\"containerModal\"></div>\n        <!--Foto del visitante-->\n        <div class=\"row justify-content-center\">\n            <video class=\"mt-2\" id=\"player\" width=320 height=240 autoplay></video>\n            <canvas class=\"mt-2 mb-2\" id=\"snapshot\" width=320 height=240></canvas>\n        </div>\n          <div class=\"row justify-content-center\">\n            <button class=\"mr-1 btn btn-warning text-white shadowStyle\" id=\"capture\">Sacar foto</button>\n            <button class=\"ml-1 btn btn-warning text-white shadowStyle\" id=\"newCapture\">Otra Foto</button>\n          </div>\n        </div>\n        <!--Datos del visitante-->\n        <div class=\"container\" id=\"visitorData\">\n          <label for=\"nameVisitor\" class=\"mt-2 colorTextLabel\">Nombre del visitante</label>\n          <input type=\"text\" id=\"nameVisitor\" placeholder=\"Nombre Visitante\" required>\n\n          <label for=\"rutVisitor\" class=\"colorTextLabel\">RUT del visitante</label>\n          <input type=\"text\" id=\"rutVisitor\" placeholder=\"RUT\" required>\n\n          <label for=\"numCompanionsVisitor\" class=\"colorTextLabel\">Número de acompañantes</label>\n          <input type=\"text\" id=\"numCompanionsVisitor\" placeholder=\"Número\" required>\n        </div>\n        <div>\n          <div class=\"row justify-content-center\">\n            <button class=\" p-3 mt-2 btn btn-warning text-white shadowStyle\" id=\"btnDataVisitor\" onclick=\"window.controller.dataInformationVisitor()\">Agregar</button>\n          </div>\n        </div>\n        </div> \n      </div>\n      </div>`;\n};\n\n// escritura de datos de residentes \nwindow.view.resident = () => {\n  let divResident = document.getElementById('container');\n  divResident.innerHTML = `<div class=\"row justify-content-center\">\n    <div class=\"bg-white p-4 col-lg-10 rounded containerTransparent\">\n    <p class=\"lead titlePage mt-4\">Registro Residentes</p>\n      <input id=\"numberDeptResident\" type=\"text\" placeholder=\"Nº departamento\">\n      <input id=\"nameResident\" type=\"text\" placeholder=\"Nombre\">\n      <input id=\"resident2\" type=\"text\" placeholder=\"Otro residente\">\n      <input id=\"resident3\" type=\"text\" placeholder=\"Otro residente\">\n      <input id=\"resident4\" type=\"text\" placeholder=\"Otro residente\">\n      <input id=\"emailResident\" type=\"text\" placeholder=\"Correo electrónico\">\n      <button type=\"button\" id=\"btnDataResident\" class=\"btn btn-warning text-white shadowStyle\" onclick=\"window.controller.dataInformationResident()\">Guardar</button>\n      </div>\n      </div>`;\n};\n\n// escritura datos visitantes en tabla\nwindow.view.listVisitors = () => {\n  let htmlListVisitors = `<div class=\"contTable\">\n    <table class=\"table table-bordered table-hover bg-white tableStyle\">\n    <thead class=\"colorTable\">\n      <tr>\n        <th scope=\"col\" class=\"text-center text-white lead\">Depto a visitar</th>\n        <th scope=\"col\" class=\"text-center text-white lead\">Nombre Visitante</th>\n        <th scope=\"col\" class=\"text-center text-white lead\">Rut</th>\n        <th scope=\"col\" class=\"text-center text-white lead\">N° Acompañantes</th>\n        <th scope=\"col\" class=\"text-center text-white lead\">Fecha</th>\n        <th scope=\"col\" class=\"text-center text-white lead\">Hora</th>\n        <th scope=\"col\" class=\"text-center text-white lead\">Foto</th>\n      </tr>\n  </thead>`;\n  const allVisitors = window.controller.tableCollectionVisitors();\n  allVisitors.then(visitors => {\n    visitors.forEach(visitor => {\n      const vis = visitor.data();\n\n      // formato fecha\n      const optionsDate = {\n        // weekday: 'short',\n        year: 'numeric',\n        month: 'long',\n        day: 'numeric'\n      };\n      let dateFormat = vis.date.toDate();\n      let date = dateFormat.toLocaleDateString('es-CL', optionsDate);\n\n      // formato hora\n      const optionsHour = {\n        hour: 'numeric',\n        minute: 'numeric'\n      };\n      let hour = dateFormat.toLocaleTimeString('es-CL', optionsHour);\n      htmlListVisitors += `<tbody>\n      <tr>\n      <td class=\"text-center\">${vis.numberDept}</td>\n      <td class=\"text-center\">${vis.name}</td>\n      <td class=\"text-center\">${vis.rut}</td>\n      <td class=\"text-center\">${vis.companions}</td>\n      <td class=\"text-center\">${date}</td>\n      <td class=\"text-center\">${hour}</td>\n      <td class=\"text-center\"><button class=\"btn btn-warning text-white shadowStyle\" data-toggle=\"modal\" data-target=\"#exampleModalPhoto\" onclick=\"window.view.photoVisitModal('${vis.image}')\">Ver</button></td>\n      </tr>\n      </tbody>`;\n    });\n    let divListVisitors = document.getElementById('container');\n    divListVisitors.innerHTML = htmlListVisitors + '</table> </div>';\n  });\n};\n\n// modal foto visitante\nwindow.view.photoVisitModal = image => {\n  let modalPhotoVisit = document.getElementById('containerPhoto');\n  modalPhotoVisit.innerHTML = `<div class=\"modal fade\" id=\"exampleModalPhoto\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel1\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n  <div class=\"modal-content\">\n  <div class=\"modal-header\">\n  <h5 class=\"modal-title text-center\" id=\"exampleModalLabel1\">Foto Visitante</h5>\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n  <span aria-hidden=\"true\">&times;</span>\n  </button>\n  </div>\n  <div class=\"modal-body \">\n  <img src=\"${image}\" class=\"img-fluid imgStyle\" alt=\"Fotografia Visitante\">\n  </div>\n  <div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-warning text-white shadowStyle\" data-dismiss=\"modal\">Cerrar</button>\n  </div>\n  </div>\n  </div>\n  </div>`;\n};\n\n// agrega los residentes de un departamento\nwindow.view.insertResident = dataRes => {\n  let divInsertResident = document.getElementById('insertResident');\n  divInsertResident.innerHTML = `<div class=\"container containerResidentDato\">\n  <label for=\"Residents\" class=\"mt-2 colorTextLabel\">Residentes</label>\n  <p>Residente: ${dataRes.nameResident}</p>\n  <p>Residente: ${dataRes.resident2}</p>\n  <p>Residente: ${dataRes.resident3}</p>\n  <p>Residente: ${dataRes.resident4}</p>\n</div>`;\n};\n\n//# sourceURL=webpack://finalcore/./src/js/view.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../img/fondo.jpg */ \"./src/img/fondo.jpg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.fa {\r\n  color: whitesmoke;\r\n}\r\n\r\n#visitorPhoto, #visitorData, #apartmentNumber {\r\n  background-color: white;\r\n  border-radius: 3px;\r\n}\r\n\r\n/* body {\r\n  background-color: #AACA97;\r\n} */\r\n\r\ninput[type=text] {\r\n  width: 100%;\r\n  padding: 12px 20px;\r\n  margin: 8px 0;\r\n  display: inline-block;\r\n  border: 1px solid #ccc;\r\n  border-radius: 4px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n\r\n.imageLogo {\r\n  width: 40vw;\r\n}\r\n\r\n.containerStyle {\r\n  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\r\n  background-size: 100%;\r\n}\r\n\r\n@media (min-width: 992px) {\r\n  .sidebar {\r\n    position: fixed;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    z-index: 100;\r\n    padding: 48px 0 0;\r\n    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);\r\n  }\r\n  .sidebar-sticky {\r\n    position: sticky;\r\n    top: 0;\r\n    height: calc(100vh - 0px);\r\n    padding-top: .5rem;\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n  }\r\n  .imageLogo {\r\n    width: 20vw;\r\n  }\r\n}\r\n\r\n.enlacesMenu {\r\n  /*width: 200px;*/\r\n  background: transparent;\r\n  border: none;\r\n  float: left;\r\n  cursor: pointer;\r\n}\r\n\r\n.sidebarColor {\r\n  background-color: #4BBB8B;\r\n}\r\n\r\n.titleLogo{\r\n  color: #FFC107 !important;\r\n}\r\n\r\n.colorIcon{\r\n  content: \"\\\\f0c9\";\r\n  font-size: 30px;\r\n  color: #FFC107;\r\n}\r\n\r\n.colorTextLabel{\r\n    color: #666;\r\n    font-size: 19px;\r\n}\r\n\r\n.titlePage{\r\n  text-align: center;\r\n    font-size: 30px;\r\n    color: #169F85;\r\n}\r\n\r\n.containerCamara{\r\n  height: 260px;\r\n}\r\n\r\n.colorTable{\r\n  background-color: #169F85;\r\n}\r\n\r\n.titleLogo:hover{\r\n  color: #FFC107;\r\n  text-decoration: none;\r\n}\r\n\r\n.containerTransparent{\r\n  opacity: 0.7;\r\n  margin-bottom: 30px;\r\n  padding-bottom: 20px;\r\n  box-shadow: 4px 6px 11px 0px rgba(0,0,0,0.54);\r\n}\r\n\r\n.tableStyle{\r\n  box-shadow: 4px 6px 11px 0px rgba(0,0,0,0.54);\r\n}\r\n.shadowStyle{\r\n  box-shadow: 3px 3px 11px 0px rgba(0,0,0,0.54);\r\n}\r\n\r\n.containerResidentDato{\r\n  border: 1px solid #cccccc;\r\n  border-radius: 5px;\r\n  padding: 15px;\r\n  box-shadow: 3px 3px 11px 0px rgba(0,0,0,0.54);\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.imgStyle{\r\n  display: flex;\r\n  margin: 0 auto;\r\n}\r\n\r\n.contTable{\r\n  /* overflow: hidden; */\r\n  overflow-x: scroll;\r\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://finalcore/./src/css/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://finalcore/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://finalcore/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://finalcore/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://finalcore/./src/css/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://finalcore/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://finalcore/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://finalcore/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://finalcore/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://finalcore/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://finalcore/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/img/fondo.jpg":
/*!***************************!*\
  !*** ./src/img/fondo.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"d9f8a85d9ee61c60851e.jpg\";\n\n//# sourceURL=webpack://finalcore/./src/img/fondo.jpg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;
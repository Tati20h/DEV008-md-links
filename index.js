/* eslint-disable no-async-promise-executor */
/* eslint-disable import/extensions */
const validations = require('./utils/validations.js');
const files = require('./utils/files.js');

module.exports = (route, options) => new Promise(async (resolve, reject) => {
  let response;
  // VALIDO SI ES RELATIVA P ABSOLUTA
  const newRoute = validations.isAbsolutePathVal(route);
  // validacion si existe ?
  const exist = validations.existPathVal(newRoute);
  if (!exist) {
    reject(new Error('Esta ruta no existe'));
  }
  const filesFolder = files.readFolder(newRoute);
  // VALIDACION DE SI HAY ARCHIVOS?
  if (filesFolder.length <= 0) {
    reject(new Error('La ruta no contiene archivos ni carpetas'));
  }

  response = await files.inspectFolder(filesFolder, newRoute, options.validate);

  const okResp = [];
  response.forEach((e) => {
    if (e.ok === 'fail') {
      okResp.push(e);
    }
  });

  if (options.stats) {
    response = `Total: ${response.length} Unique: ${response.length}`;
    if (options.validate) {
      response = `${response} Broken: ${okResp.length}`;
    }
  }

  resolve(response);
});

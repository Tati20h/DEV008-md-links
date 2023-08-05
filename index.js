const validations = require('./utils/validations.js')
const files = require('./utils/files.js')


module.exports = (route) => {
  return new Promise((resolve, reject) => {
    //VALIDO SI ES RELATIVA P ABSOLUTA
    const newRoute = validations.isAbsolutePathVal(route);
    // validacion si existe ?
    const exist = validations.existPathVal(newRoute);
    if (!exist) {
      reject(new Error("Esta ruta no existe"))
    }
    const filesFolder = files.readFolder(newRoute)
    //VALIDACION DE SI HAY ARCHIVOS?
    if (filesFolder.length <= 0) {
      reject(new Error("La ruta no contiene archivos ni carpetas"));
    }

    resolve(files.inspectFolder(filesFolder, newRoute));


    resolve(newRoute)
  })
};


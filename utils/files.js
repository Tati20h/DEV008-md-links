const fs = require('fs');
const path = require('path');
const validations = require('./validations.js')

let resp = []

const inspectFolder = (folder, route) => {

    //statFs evalua y saca informacion de la ruta
    const statFs = fs.statSync(route);

    //si el folder está vacío devuelve vacío
    if (folder.length <= 0) {
        return ''
    }

    // si es un directorio, entra aqui
    if (statFs.isDirectory()) {
        // aquí lee el directorio
        const folder = readFolder(route);

        //con este for leo lo que se encuentra dentro del directorio
        for (const files of folder) {
            //a cada archivo le estoy sacando su ruta independiente gracias a path.join, esto para que sea
            // reevaluada cuando vuelva a entrar en la función de inspectFolder
            const routeElement = path.join(route, files)
            //esta función es la que se llama a si misma y la pasa el nuevo folder y la nueva ruta
            resp.push(inspectFolder(folder, routeElement))
        }

        return resp;
    }

    // hasta que por fin encuentra un archivo, lo retorna para luego ser guardado en un arreglo
    if (statFs.isFile()) {
        console.log("val ", route, "  ", validations.readMdVal(route))
        return validations.readMdVal(route)
        
    }
}

const readFolder = (route) => {
    return fs.readdirSync(route);
}

module.exports = {
    readFolder,
    inspectFolder
}
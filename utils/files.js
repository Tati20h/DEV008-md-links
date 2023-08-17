const fs = require('fs');
const path = require('path');
const validations = require('./validations.js');
const service = require('./service.js');

const inspectFolder = (folder, route, valid, resp, callback) => {
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
            inspectFolder(folder, routeElement, valid, resp, (fileResults) => {
                console.log(fileResults)
            });
        }
        callback(resp)
    }


    if (statFs.isFile()) {
        //console.log("val ", route, "  ", validations.readMdVal(route))
        const md = validations.readMdVal(route)
        if (md) {
            readFileMd(route, valid, (linksArray) => {
                if (linksArray.length > 0) {
                    callback(linksArray)
                }
            });
        }
    }
}

const readFolder = (route) => {
    return fs.readdirSync(route);
}

const readFileMd = (route, valid, callback) => {
    fs.readFile(route, 'utf-8', async (error, data) => {
        if (error) {
            callback([])
            return
        }

        const resp = await searchUrl(data, route, valid)
        callback(resp)
    })
}

const searchUrl = async (file, route, valid) => {
    const regex = /<a\s+(.*?)>(.*?)<\/a>/g;
    const urlRegex = /href=["'](.*?)["']/;
    let validUrl
    let urlInfo = {};
    const jsonUrl = [];

    while ((validUrl = regex.exec(file))) {
        const url = urlRegex.exec(validUrl[1])[1]

        if (valid) {
            urlInfo.href = url;
            urlInfo.text = validUrl[2];
            urlInfo.file = route;

            try {
                const rq = await service.testUrl(url);
                urlInfo.status = rq.status;
                urlInfo.ok = 'ok';
            } catch (err) {
                urlInfo.status = err.status || 500;
                urlInfo.ok = 'fail';
            }

        } else {
            urlInfo['href'] = route;
            urlInfo['text'] = validUrl[2];
            urlInfo['file'] = url;
        }

        jsonUrl.push(urlInfo)
    }

    return jsonUrl
}

module.exports = {
    readFolder,
    inspectFolder,
    readFileMd
}
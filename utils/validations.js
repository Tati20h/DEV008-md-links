const fs = require('fs');
const path = require('path');

const isAbsolutePathVal = (route) => {
    if (path.isAbsolute(route)) {
        return route;
    }
    const newRoute = path.resolve(route);
    return newRoute;
}

const existPathVal = (route) => {
    return fs.existsSync(route);
}

const readMdVal = (routeFile) => {
    const allowedExtension = /(.md)$/i;

    console.log(allowedExtension.exec(routeFile))

    const esto = allowedExtension.exec(routeFile)

    return esto['input'];
}

module.exports = {
    isAbsolutePathVal,
    existPathVal,
    readMdVal
}
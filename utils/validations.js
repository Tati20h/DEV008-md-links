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


module.exports = {
    isAbsolutePathVal,
    existPathVal,
}
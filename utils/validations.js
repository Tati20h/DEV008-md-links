const fs = require('fs');
const path = require('path');

const isAbsolutePathVal = (route) => {
  if (path.isAbsolute(route)) {
    return route;
  }
  const newRoute = path.resolve(route);
  return newRoute;
};

const existPathVal = (route) => fs.existsSync(route);

const readMdVal = (routeFile) => {
  const allowedExtension = /(.md)$/i;

  const routeDetail = allowedExtension.exec(routeFile);

  return !!routeDetail;
};

module.exports = {
  isAbsolutePathVal,
  existPathVal,
  readMdVal,
};

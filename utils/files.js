/* eslint-disable no-undef */
/* eslint-disable no-cond-assign */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');
const validations = require('./validations.js');
const service = require('./service.js');

const inspectFolder = async (folder, route, valid) => {
  let resp = [];

  const statFs = fs.statSync(route);

  if (folder.length <= 0) {
    return [];
  }

  if (statFs.isFile()) {
    const md = validations.readMdVal(route);
    if (md) {
      const data = fs.readFileSync(route, 'utf-8');
      const linksArray = await searchUrl(data, route, valid);
      if (linksArray.length > 0) {
        resp = resp.concat(linksArray);
      }
      return resp;
    }
    return [];
  } if (statFs.isDirectory()) {
    const folderInterno = readFolder(route);
    for (const files of folderInterno) {
      const routeElement = path.join(route, files);
      const subResults = await inspectFolder(folderInterno, routeElement, valid);
      resp = resp.concat(subResults);
    }
    return resp;
  }
  return [];
};

const readFolder = (route) => fs.readdirSync(route);

const searchUrl = async (file, route, valid) => {
  const regex = /<a\s+(.*?)>(.*?)<\/a>/g;
  const urlRegex = /href=["'](.*?)["']/;
  const jsonUrl = [];

  while ((validUrl = regex.exec(file))) {
    const url = urlRegex.exec(validUrl[1])[1];

    const urlInfo = {};

    if (valid) {
      urlInfo.href = url;
      // eslint-disable-next-line prefer-destructuring
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
      urlInfo.href = url;
      // eslint-disable-next-line prefer-destructuring
      urlInfo.text = validUrl[2];
      urlInfo.file = route;
    }

    jsonUrl.push(urlInfo);
  }

  return jsonUrl;
};

module.exports = {
  readFolder,
  inspectFolder,
};

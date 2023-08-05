const mdLinks = require('./index.js');

const route = process.argv[2];


mdLinks(route)
    .then(links => {
        console.log(links);
    })
    .catch(console.error);
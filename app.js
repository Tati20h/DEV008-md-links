const mdLinks = require('./index.js');
const chalk = require('chalk');
console.log(chalk.blue('Hello world!'));
const route = process.argv[2];
const isOptionValidate = process.argv.includes('--validate');
const options = {
    validate: isOptionValidate
}

mdLinks(route, options)
    .then(links => {
        console.log(links);
    })
    .catch(chalk.red(console.error));
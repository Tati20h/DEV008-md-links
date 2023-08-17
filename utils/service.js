const testUrl = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {

                resolve(response);
            })
            .catch((error) => {
                reject(error)
            });
    })
}

module.exports = {
    testUrl
}
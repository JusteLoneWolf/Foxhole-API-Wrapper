const https = require('https');

const request = (url) =>{
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(data)
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    })

}

module.exports ={
    request
}

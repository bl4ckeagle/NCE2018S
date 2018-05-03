const request = require("request");


fs = require('fs');

class Helper {
    constructor(baseUrl) {
    }

    static getTelegramKey() {
        let key = "";
        try {
            key = fs.readFileSync('key.txt', 'utf8').toString();
            console.log(key);
        } catch (err) {
            console.log(err);
            console.log("wrong file path or something else is wrong with the");
        }
        return key;
    };

    static getAccessToken(baseUrl) {
            let promise1 = new Promise(
                function (resolve, reject) {
                    request.post({
                        url: baseUrl + "/token",
                        body: {
                            "credentials": {
                                "user": "admin",
                                "password": "gymbro_pw"
                            }
                        },
                        json: true, //// Automatically parses the JSON string in the response

                    }, (error, response, body) => {
                        if (error)
                            reject(error);
                        if (!error && response.statusCode === 200) {
                            resolve(body)
                        }
                    })
                });
            promise1.then(body =>{
                console.log(body.token)
                }
            )
        };
}

module.exports = Helper;

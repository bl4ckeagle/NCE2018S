const request = require("request");
const loki = require("lokijs");


fs = require('fs');

class Helper {
    constructor() {
    }

    //get the telegramID from a textfile
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

    //gets access token from nce app, with callback for the bot.js promise all
    static getAccessToken(baseUrl) {
        let promise = new Promise(resolve => {
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
                        console.log('error');
                    if (!error && response.statusCode === 200) {
                        resolve({token: body.token});
                    }
                })
            }

            );
        return promise.then((resolve)=>
            {
                return  resolve.token;
            }
        )
    };


    static createCollection(collectionName,data) {
        let db = new loki;
        let collection = db.addCollection(collectionName);
        collection.insert(data);
        return collection;
    }
}

module.exports = Helper;

const TeleBot = require('telebot');
const request = require("request");
const helper = require("./helper/helper");
const nceDefaultbotCommands = require("./botInstruction/ncedefaultbot");
const key =helper.getmykey();
const TELEGRAM_BOT_TOKEN = key;
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const baseUrl = "http://healthylivingbot.cosy.univie.ac.at:5000";

// //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4ifQ.OTF_oJRoInPZcBF9Ep2uut73Qd0HY4z0l6ssxyNwXs0'

getAccesToken().then( token => {
    accessToken = token.token;
    new nceDefaultbotCommands(bot,accessToken,baseUrl);
    bot.start();
});


function getAccesToken(){
    return new Promise(function(fulfill, reject){
        console.log("token");
        request.post({
            url: baseUrl + "/token",
            body: {
                "credentials":{
                    "user": "admin",
                    "password": "gymbro_pw"
                }
            },
            json: true, //// Automatically parses the JSON string in the response

        }, (error, response, body) => {
            if(error)
                console.log(error);

            if (!error && response.statusCode === 200) {
                fulfill(body)
            }else
            {
                reject("not possible")
            }
        });
    }).catch(console.log);
}

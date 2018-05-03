const TeleBot = require('telebot');
const helper = require("./helper/helper");
const nceDefaultbotCommands = require("./botInstruction/ncedefaultbot");
const baseUrl = "http://healthylivingbot.cosy.univie.ac.at:5000";
const key = helper.getTelegramKey();
const TELEGRAM_BOT_TOKEN = key;
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);


// //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4ifQ.OTF_oJRoInPZcBF9Ep2uut73Qd0HY4z0l6ssxyNwXs0'

let getKeys;
getKeys = new Promise(
    resolve => {
        resolve(helper.getAccessToken(baseUrl));
    });

getKeys.then(
    accesstoken => {

        new nceDefaultbotCommands(bot, accesstoken, baseUrl);
        bot.start();
    }, reject => {
        console.log(reject)
    });

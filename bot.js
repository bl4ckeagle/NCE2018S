const TeleBot = require('telebot');
const loki = require('lokijs');
const helper = require("./helper/helper");
const nceDefaultbotCommands = require("./botInstruction/ncedefaultbot");
const botComamnds = require("./botInstruction/botCommands");
const baseUrl = "http://healthylivingbot.cosy.univie.ac.at:5000";
const key = helper.getTelegramKey();
const TELEGRAM_BOT_TOKEN = key;
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
var db = new loki('loki.json');

let getKeys;
getKeys = new Promise(
    resolve => {
        resolve(helper.getAccessToken(baseUrl));
    }

);


getKeys.then(
    accesstoken => {

        new nceDefaultbotCommands(bot, accesstoken, baseUrl);
        new botComamnds(bot,db);
        bot.start();
    }).catch(()=>{
        console.log("error")
});

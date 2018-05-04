const TeleBot = require('telebot');
const helper = require("./helper/helper");
const nceDefaultbotCommands = require("./botInstruction/ncedefaultbot");
const botComamnds = require("./botInstruction/botCommands");
const baseUrl = "http://healthylivingbot.cosy.univie.ac.at:5000";
const key = helper.getTelegramKey();
const TELEGRAM_BOT_TOKEN = key;
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

let getKeys;
getKeys = new Promise(
    resolve => {
        resolve(helper.getAccessToken(baseUrl));
    });

getKeys.then(
    accesstoken => {

        new nceDefaultbotCommands(bot, accesstoken, baseUrl);
        new botComamnds(bot);
        bot.start();
    }, reject => {
        console.log(reject)
    });

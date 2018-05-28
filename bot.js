const TeleBot = require('telebot');
const helper = require("./helper/helper");
const nceDefaultbotCommands = require("./botInstruction/ncedefaultbot");
const botComamnds = require("./botInstruction/botCommands");
const baseUrl = "http://healthylivingbot.cosy.univie.ac.at:5000";
const key = helper.getTelegramKey();
const TELEGRAM_BOT_TOKEN = key;
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

Promise.all([
    helper.getAccessToken(baseUrl)]
).then(([nceToken]) => {

        console.log("my token " + nceToken);
        new nceDefaultbotCommands(bot, nceToken, baseUrl);
        new botComamnds(bot,nceToken,baseUrl);
        bot.start();
    }
).catch((error) => {
    console.log(error)
});



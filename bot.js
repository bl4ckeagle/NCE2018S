const TeleBot = require('telebot');
const loki = require('lokijs');
const helper = require("./helper/helper");
const nceDefaultbotCommands = require("./botInstruction/ncedefaultbot");
const reqTrain =require("./controller/trainingsController");
const botComamnds = require("./botInstruction/botCommands");
const baseUrl = "http://healthylivingbot.cosy.univie.ac.at:5000";
const key = helper.getTelegramKey();
const TELEGRAM_BOT_TOKEN = key;
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
let db = new loki("nce.db");

promise = new Promise(
    resolve => {
        let userCollection = helper.createCollection("user", db);
        let excersizeCollection = helper.createCollection("excercise", db);
        let accessToken = helper.getAccessToken(baseUrl);

        resolve({
            "database":{"userCollection": userCollection, "excersizeCollection": excersizeCollection},
            "accessToken": accessToken
        });
    });

promise.then(
    promises => {
        new nceDefaultbotCommands(bot, promises.accessToken, baseUrl);
        new botComamnds(bot, promises.database);
        let trainingsController=new reqTrain(baseUrl,);
        bot.start();
    }).catch(() => {
    console.log("error")
});



const userModel = require("../model/User");
const helper = require("../helper/helper");
const userController = require("../controller/userController");


class BotCommands {
    constructor(bot, nceToken, baseUrl) {
        this.bot = bot;
        this.userCollection = null;
        this.nceToken = nceToken;
        this.baseUrl = baseUrl;
        this.training = null;
        this.calender = null;
        this.defaultBot();
        //get all collections from the api
        Promise.all([
            new userController(this.baseUrl, this.nceToken).getUser(),
        ]).then(([getUser]) => {
                this.userCollection = helper.createCollection('user', getUser);
            }
        ).catch((e) => {
                console.log(e + " in BotCommands check Manuel");
            }
        )
    }

    defaultBot() {
        this.bot.on("/startTraining",
            (msg) => {
                let userId = msg.from.id;
                let userName = msg.from.first_name;

                console.log(userName); // get Names
                console.log(userId); // get userID
                let user = new userModel(userId, userName, this.userCollection);
                console.log(user.absExp);
                msg.reply.text(user.name);

            });
        this.bot.on('/easterEgg',
            (gif) => {
                this.bot.sendVideo(gif.from.id, "./media/easter/oZXvR.gif");
                console.log(gif.from.id);
            });

        this.bot.on('/test',
            (msg) => {
                let replyMarkup = bot.keyboard([
                    ['/buttons', '/inlineKeyboard'],
                    ['/start', '/hide']
                ], {resize: true});
                this.bot.sendMessage(msg.from.id, 'Keyboard example.', {replyMarkup});
            });
    };
}

module.exports = BotCommands; //edit class name
const user = require("../model/User");
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
            })
    };
}

module.exports = BotCommands; //edit class name
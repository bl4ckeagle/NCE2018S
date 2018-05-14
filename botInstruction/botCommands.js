const user = require("../model/User");

class BotCommands {
    constructor(bot, db) {
        this.bot = bot;
        this.db = db;
        this.user =0;
        this.defaultBot();
    }

    defaultBot() {


        this.bot.on("/startTraining",
            (msg) => {
                let userId = msg.from.id;
                let userName = msg.from.first_name;
                console.log(userName); // get Names
                console.log(userId); // get userID
                this.bot.sendMessage(msg.from.id, userId);
                this.bot.sendMessage(msg.from.id, userName);
                this.user=new user(userId,userName,this.db.userCollection);

            })};
}

module.exports = BotCommands; //edit class name

class BotCommands {
    constructor(bot,db) {
        this.bot = bot;
        this.db=db;
        this.defaultBot();
    }

    defaultBot() {


        this.bot.on("/userId",
            (msg) => {
                let userId=msg.from.id;
                console.log(userId); // get userID
                this.bot.sendMessage(msg.from.id,userId);


            }
        );
    }


}

module.exports = BotCommands; //edit class name
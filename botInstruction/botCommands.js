
class BotCommands {
    constructor(bot) {
        this.bot = bot;
        this.userid = 0;
        this.defaultBot();
    }

    defaultBot() {


        this.bot.on("/userId",
            (msg) => {
                console.log(msg.from.id); // get userID
                this.bot.sendMessage(msg.from.id, `Hello, ${ msg.from.id }!`);
            }
        );
    }


}

module.exports = BotCommands; //edit class name
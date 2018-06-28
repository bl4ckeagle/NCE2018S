const request = require("request");
const schedule = require("node-schedule");

class Scheduler {
    constructor(bot, userID) {
        let jobs = schedule.scheduleJob('*/15 * * * * *', function(){
            //bot.sendMessage(24579316, 'Schedule testing');
            //console.log("testing");

           let replyMarkup = bot.inlineKeyboard([
                [
                    bot.inlineButton('Yes', {callback: 'Yes'}),
                    bot.inlineButton('No', {callback: 'No'})
                ]
            ]);

            bot.sendMessage(userID, 'Did you do the exercise?', {replyMarkup});
        });
    }
}

module.exports = Scheduler;
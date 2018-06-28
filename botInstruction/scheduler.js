const request = require("request");
const schedule = require("node-schedule");

class Scheduler {
    constructor(bot, userID) {
        // This is the right cron time for a reminder every day at 8pm
        //let jobs = schedule.scheduledJob('0 0 20 * * *', function () {
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
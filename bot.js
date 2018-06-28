const TELE_BOT = require('telebot');
const EXERCISE = require('./model/exercise');
const HELPER = require("./helper/helper");
const NCE_DEFAULT_BOT_COMMANDS = require("./botInstruction/ncedefaultbot");
const BOT_COMMANDS = require("./botInstruction/botCommands");
const BASE_URL = "http://healthylivingbot.cosy.univie.ac.at:5000";
const TELEGRAM_BOT_TOKEN = HELPER.getTelegramKey();
const EXERCISE_CONTROLLER = require('./controller/exerciseController');
const bot = new TELE_BOT(TELEGRAM_BOT_TOKEN);

//initlise bot with api token and nce token
Promise.all([

        HELPER.getAccessToken(BASE_URL),
        excersizes = new EXERCISE_CONTROLLER().getExercise()
    ]
)
    .then(([nceToken, exerciseCollection]) => {
        let exercise = new EXERCISE(exerciseCollection);

        return [nceToken, exercise];

    })
    .then(([nceToken, exercise]) => {

            console.log("my token " + nceToken);
            new NCE_DEFAULT_BOT_COMMANDS(bot, nceToken, BASE_URL);
            new BOT_COMMANDS(bot, nceToken, BASE_URL, exercise);
            bot.start();
        }
    ).catch((error) => {
    console.log(error)
});



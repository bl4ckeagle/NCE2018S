const userModel = require("../model/User");
const trainingsModel = require("../model/Training");

const helper = require("../helper/helper");
const userController = require("../controller/userController");
const trainingsController = require("../controller/trainingsController");


class BotCommands {
    constructor(bot, nceToken, baseUrl) {
        this.bot = bot;
        this.userCollection = null;
        this.exercisesCollection = null;
        this.nceToken = nceToken;
        this.baseUrl = baseUrl;
        this.training = null;
        this.calender = null;
        this.defaultBot();
        //get all collections from the api
        Promise.all([
            new userController(this.baseUrl, this.nceToken).getUser(),
            new trainingsController(this.baseUrl).requestAllExercises(),
        ]).then(([getUser,requestAllExercises]) => {
                this.userCollection = helper.createCollection('user', getUser);
              //  console.log("Users collection:" + JSON.stringify(this.userCollection))
                this.exercisesCollection = helper.createCollection('exercises',requestAllExercises);
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
                let trainings = new trainingsModel(this.exercisesCollection);
                console.log(user.absExp);
                msg.reply.text(user.name);
            });
        this.bot.on('/easterEgg',
            (gif) => {
                this.bot.sendVideo(gif.from.id, "./media/easter/oZXvR.gif");
                console.log(gif.from.id);
            });
    };
}

module.exports = BotCommands; //edit class name

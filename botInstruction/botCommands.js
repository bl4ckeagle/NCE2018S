const userModel = require("../model/User");
const helper = require("../helper/helper");
const trainingsModel = require("../model/training");
const userController = require("../controller/userController");
const trainingsController = require("../controller/trainingsController");
const request = require("request");

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
            new trainingsController(this.baseUrl, this.nceToken).requestAllExercises(),
        ]).then(([getUser,getTraining]) => {
                this.userCollection = helper.createCollection('user', getUser);
                this.exercisesCollection=helper.createCollection('training',getTraining)
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
                console.log(user);
                msg.reply.text(userId );
            });

        this.bot.on("/randomExercise",
            (msg)=> {
              let trainings = new trainingsModel(this.exercisesCollection);
              let exercise = trainings.getRandomExercise();
              msg.reply.text(exercise.name);
              msg.reply.text(exercise.description)
            });

        this.bot.on("/getCategories",
            (msg)=> {
              let trainings = new trainingsModel(this.exercisesCollection);
              let categories = trainings.getCategories()
              console.log(categories)
              for(let category of categories){
                msg.reply.text(category)
              }
            });

        this.bot.on("/getExercise",
            (msg)=> {
              let trainings = new trainingsModel(this.exercisesCollection);
              let exercises = trainings.getExercise('Arms',3);
              for(let exercise of exercises){
                msg.reply.text(exercise.name);
                msg.reply.text(exercise.description)
              }
            });

        this.bot.on('/easterEgg',
            (gif) => {
                this.bot.sendVideo(gif.from.id, "./media/easter/oZXvR.gif");
                console.log(gif.from.id);
            });

        this.bot.on('/more', (msg) => {

            let replyMarkup = this.bot.inlineKeyboard([
                [
                    this.bot.inlineButton('Choose Category', {callback: 'chooseCat'})
                ]
            ], {resize: true});

            return this.bot.sendMessage(msg.from.id, 'What do you want to do?', {replyMarkup});

        });

        this.bot.on('callbackQuery', (msg) => {
            //this.bot.sendMessage(msg.from.id, `Hello, ${ msg.from.first_name }!`);

            if(msg.data == "chooseCat") {
                let p1 = new Promise(resolve => {
                    let options =
                        {
                            url: this.baseUrl + "/exercise/category",
                            json: true,
                            headers: {
                                token: this.nceToken
                            }
                        };
                    request.get(options, (error, response, body) => {
                            if (error)
                                console.log("get user Throws an error, check");

                            if (!error && response.statusCode === 200) {
                                //return pretty json
                                //show first exercise of this category
                                resolve({body: body});
                            }
                        }
                    )

                });
                return p1.then((res) => {
                    let exCategories = res.body.results;
                    let buttons = [];

                    for(var i = 0; i < exCategories.length; i++) {
                        //console.log(exCategories[i].name);
                        let buttonsSub = [];
                        buttonsSub.push(this.bot.inlineButton(exCategories[i].name, {callback: exCategories[i].name}));

                        buttons.push(buttonsSub);
                    }

                    let replyMarkup = this.bot.inlineKeyboard(
                        buttons
                    , {resize: true});

                    this.bot.sendMessage(msg.from.id, 'Please choose the exercise category:', {replyMarkup});
                    //this.bot.sendMessage(msg.from.id, String(res.body));
                    }
                )
            } else {
                this.bot.sendMessage(msg.from.id, `We have to do something here!`);
            }
        })

    };
}

module.exports = BotCommands; //edit class name

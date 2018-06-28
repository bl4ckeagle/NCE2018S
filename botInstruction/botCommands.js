const userModel = require("../model/User");
const helper = require("../helper/helper");
const trainingsModel = require("../model/training");
const userController = require("../controller/userController");
const trainingsController = require("../controller/trainingsController");
const calendarController = require("../controller/calendarController");

const request = require("request");

class BotCommands {
    constructor(bot, nceToken, baseUrl) {
        this.bot = bot;
        this.userCollection = null;
        this.exercisesCollection = null;
        this.nceToken = nceToken;
        this.baseUrl = baseUrl;
        this.training = null;
        this.calender = null;
        //get all collections from the api
        this.defaultBot(); //to avoid ungandled promise in defaultBot
        Promise.all([
            new userController(this.baseUrl, this.nceToken).getUser(),
            new trainingsController(this.baseUrl, this.nceToken).requestAllExercises(),
        ]).then(([getUser,getTraining]) => {
                this.exercisesCollection=helper.createCollection('training',getTraining)
                //this.userCollection = helper.createCollection('user', getUser);
            }
        ).catch((e) => {
                console.log(e + " LOOHin BotCommands check Manuel");
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
                //let user = new userModel(userId, userName, this.userCollection);
                //console.log(user);
                this.bot.sendMessage(
                  msg.from.id,
                  "Hi, " + userName + "! \n Welcome to Healthy Living bot. ").then(()=>{
                let replyMarkup = this.bot.inlineKeyboard([
                    [
                        this.bot.inlineButton('yep', {callback: 'chooseCat'})
                    ]
                ], {resize: true});

                return this.bot.sendMessage(msg.from.id, 'Get an exercise!', {replyMarkup});

            })
          });


        this.bot.on("/randomExercise",
            (msg)=> {
              let trainings = new trainingsModel(this.exercisesCollection);
              let exercise = trainings.getRandomExercise();
              this.bot.sendMessage(msg.from.id,exercise.name).then(()=>{
              this.bot.sendMessage(msg.from.id,exercise.description)}).then(()=>{
              let replyMarkup = this.bot.inlineKeyboard([
                  [
                      this.bot.inlineButton('done', {callback: 'exerciseDone'}),
                  ]
              ], {resize: true});

              return this.bot.sendMessage(
                msg.from.id,
                'Press it when you\'ll finish :)',
                {replyMarkup});
            })
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

        this.bot.on('/sched',
            (msg) => {
                this.bot.sendMessage(msg.from.id, msg.from.id);
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

            if(msg.data === "chooseCat") {
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

                    for(let i = 0; i < exCategories.length; i++) {
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
                )//if this is choose category button
            //} else if(this.exercisesCollection.findOne({'name':msg.data})) {

            }else if(this.exercisesCollection.findOne({'name':msg.data})){
              let exercise = this.exercisesCollection.findOne({'name':msg.data}).exercise[0]
              // this.bot.sendMessage("msg.from.id,exercise.name")
              // console.log(this.exercisesCollection)
              // let trainings = new trainingsModel(this.exercisesCollection)
              // let exercise = trainings.getExercise(msg.data,1)
              this.bot.sendMessage(msg.from.id,exercise.name).then(()=>{
              this.bot.sendMessage(msg.from.id,exercise.description)}).then(()=>{
              let replyMarkup = this.bot.inlineKeyboard([
                  [
                      this.bot.inlineButton('done', {callback: 'exerciseDone'}),
                  ]
              ], {resize: true});

              return this.bot.sendMessage(
                msg.from.id,
                'Press it when you\'ll finish :)',
                {replyMarkup});
            })
          }

            else if(msg.data== "useCalendar"){
              Promise.all([
                  new calendarController(this.baseUrl,43).authentificate(),
              ]).then(([authentificate]) => {
                      //here must redirect to browser
                      this.bot.sendMessage(msg.from.id,"Go to this link to connect your google calendar.")
                      this.bot.sendMessage(msg.from.id,authentificate)
                      }
              ).catch((e) => {
                      console.log(e + " in bot command authentificate");
                  }
              )

            }else if(msg.data == "exerciseDone"){
              this.bot.sendMessage(
                msg.from.id,
                "Nice! You got +1 expirience points.");


              let replyMarkup = this.bot.inlineKeyboard([
                  [
                      this.bot.inlineButton('yes', {callback: 'useCalendar'}),
                      this.bot.inlineButton('no', {callback: 'dontUseCalendar'})
                  ]
              ], {resize: true});

              return this.bot.sendMessage(
                msg.from.id,
                "Can I use your google calendar to know when to remind you about trainigs?",
                {replyMarkup});
            } else if(msg.data == "Yes") {
                let replyMarkup = this.bot.inlineKeyboard([
                    [
                    ]
                ]);
                //this.bot.editMessageReplyMarkup({inlineMsgId: msg.inline_message_id}, replyMarkup);
                //this.bot.deleteMessage(msg.from.id, msg.inline_message_id);
                this.bot.sendMessage(msg.from.id, "You are a GOOD boy/girl! " + msg.from.inline_message_id);
                //this.bot.deleteMessage(msg.from.id, msg.message_id);
            } else if(msg.data == "No") {
                this.bot.sendMessage(msg.from.id, 'You are a BAD boy/girl!');
            }

        })

    };
}

module.exports = BotCommands; //edit class name

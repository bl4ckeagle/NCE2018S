const userModel = require("../model/User");
const helper = require("../helper/helper");
const trainingsModel = require("../model/exercise");
const userController = require("../controller/userController");
const trainingsController = require("../controller/exerciseController");
const calendarController = require("../controller/calendarController");
const reminder = require("../botInstruction/scheduler");

const request = require("request");

class BotCommands {
    constructor(bot, nceToken, baseUrl,exercise) {
        this.bot = bot;
        this.userCollection = null;
        this.nceToken = nceToken;
        this.baseUrl = baseUrl;
        this.scheduler;
        this.exercise = exercise;
        this.calender = null;
        //get all collections from the api
        this.defaultBot();//to avoid ungandled promise in defaultBot
        Promise.all([
            new userController(this.baseUrl, this.nceToken).getUser(),
        ]).then(([getUser,getTraining]) => {
                this.userCollection = helper.createCollection('user', getUser);
            }
        ).catch((e) => {
                console.log(e + " Login BotCommands check Manuel");
            }
        )
    }

    defaultBot() {
        this.bot.on("/startTraining",
            (msg) => {
                // commented out for testing
                //this.scheduler = new reminder(this.bot, msg.from.id);

                let userId = msg.from.id;
                let userName = msg.from.first_name;
                let user = new userModel(userId,userName,this.userCollection);

                console.log(userName); // get Names
                console.log(userId); // get userID
                //let user = new userModel(userId, userName, this.userCollection);
                //console.log(user);
                this.bot.sendMessage(
                  msg.from.id,
                  "Hi, " + userName + "! \n Welcome to Healthy Living bot. ").then(()=>{
                    let replyMarkup = this.bot.inlineKeyboard([
                        [
                            this.bot.inlineButton('yes', {callback: 'useCalendar'}),
                            this.bot.inlineButton('no', {callback: 'dontUseCalendar'})
                        ]
                    ], {resize: true});

                    return this.bot.sendMessage(
                      msg.from.id,
                      "I need to use your Google calendar so that I can add the training slots to your calendar. Is this okay?",
                      {replyMarkup});

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


        this.bot.on("/useCalendar",
          (msg)=> {
            console.log("hu")
            Promise.all([
              new calendarController(this.baseUrl,43).getEvents(43,"thisgreateman@gmail.com"),
            ]).then(([getEvents]) => {
              //here must redirect to browser
              console.log(getEvents)
              this.bot.sendMessage(msg.from.id,"Your events:").then(()=>{
                for(let event of getEvents){
                  this.bot.sendMessage(msg.from.id,event.summary).then(()=>{
                    this.bot.sendMessage("Start:" + msg.from.id,event.start.dateTime)}).then(()=>{
                      this.bot.sendMessage("Start:" + msg.from.id,event.end.dateTime)})
                }
              })
            }).catch((e) => {
              console.log(e + " in bot command authentificate");
            })
          }
        );


        // type /setEvent 14:15
        this.bot.on(/^\/time (.+)$/, (msg, props) => {

              let time = props.match[1];
              //console.log(time);
              let today = new Date()
              let tomorrow = new Date(today)
              tomorrow.setDate(today.getDate() + 1)
              time = time.split(":")
              tomorrow.setUTCHours(time[0])
              tomorrow.setUTCMinutes(time[1])
              let startTime = JSON.stringify(tomorrow)
              let endTime = JSON.stringify(new Date(tomorrow.getTime() + 15*60000))
              startTime = startTime.substr(1,startTime.indexOf('.')-1) + "+02:00"
              endTime = endTime.substr(1,endTime.indexOf('.')-1) + "+02:00"

              // console.log(startTime);
              // console.log(endTime);

              Promise.all([
                new calendarController(this.baseUrl,43)
                .setEvent(43,"chr.knoll94@gmail.com"//"thisgreateman@gmail.com"
                          ,"Exercise","Some sescription"
                          ,startTime
                          ,endTime),
              ]).then(([setEvent]) => {
                this.bot.sendMessage(msg.from.id,"Nice! I added an event to your caleendar and i will remind you tommorrow.");
              }).catch((e) => {
                console.log(e + " in bot set event");
              })

          }
        );


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
              //let exercises = trainings.getExercise('Arms',3);
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

            if(msg.data == "chooseCat") {
                let p1 = new Promise(resolve => {
                    let options =
                        {
                            url: this.baseUrl + "/exercise.js/category",
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
                                //show first exercise.js of this category
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

                    this.bot.sendMessage(msg.from.id, 'Please choose the exercise.js category:', {replyMarkup});
                    //this.bot.sendMessage(msg.from.id, String(res.body));
                    }
                )//if this is choose category button
            //} else if(this.exercisesCollection.findOne({'name':msg.data})) {

            }else if(msg.data== "useCalendar"){
              Promise.all([
                  new calendarController(this.baseUrl,43).authentificate(),
              ]).then(([authentificate]) => {
                      //here must redirect to browser
                      this.bot.sendMessage(msg.from.id,"Go to this link to connect your Google calendar:").then(()=>{
                      this.bot.sendMessage(msg.from.id,authentificate)}).then(()=>{
                      this.bot.sendMessage(msg.from.id,"Now let's plan your workout for tomorrow!\n"+
                                                        "Please choose a time when you will be able to do some exercises (max. 30 min) tomorrow\n"+
                                                        "For example /time 16:20")})

                      }
              ).catch((e) => {
                      console.log(e + " in bot command authentificate");
                  }
              )
            }else if(msg.data == "dontUseCalendar"){
              this.bot.sendMessage(msg.from.id, "Unfortunately you can not use me if you do not give me permission.");

            }else if(msg.data == "exerciseDone"){
                this.bot.sendMessage(
                    msg.from.id,
                    "Nice! You got +1 expirience points.");



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

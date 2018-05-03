const TeleBot = require('telebot');
const request = require("request");
const helper = require("./helper/helper");
const key =helper.getmykey();
const TELEGRAM_BOT_TOKEN = key;
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const baseUrl = "http://healthylivingbot.cosy.univie.ac.at:5000";

// //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4ifQ.OTF_oJRoInPZcBF9Ep2uut73Qd0HY4z0l6ssxyNwXs0'
let accessToken = ""; 

getAccesToken().then( token => {   
    accessToken = token.token;
});


bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome to the Healthyliving Bot! :)'));

bot.on('/hello', (msg) => {
    return bot.sendMessage(msg.from.id, `Hello, ${ msg.from.first_name }!`);
});

bot.on('/easterEgg',
    (gif)=>
    gif.video(gif.from.id,"./media/easter/oZXvR.gif"));

//get exercise categories
bot.on('/cat', (msg) => {
    //http get request
    request({
        url: baseUrl + "/exercise/category",
        json: true //// Automatically parses the JSON string in the response
    }, (error, response, body) => {
        if(error) 
            console.log(error);

        if (!error && response.statusCode === 200) {
            //console.log(body);
            //return pretty json
            bot.sendMessage(msg.from.id, JSON.stringify(body.results, null, 2) );
        }
    });
});


//get exercise of specified category
bot.on(/^\/ex (.+)$/, (msg, props) => {
    //http get request
    let catId = props.match[1];

    request({
        url: baseUrl + "/exercise/category/" + catId,
        json: true // Automatically parses the JSON string in the response
    }, (error, response, body) => {
        if(error) 
            console.log(error);

        if (!error && response.statusCode === 200) {
            //return pretty json
            //show first exercise of this category
            bot.sendMessage(msg.from.id, JSON.stringify(body.results[0], null, 2) );
        }
    });
});    


// get a user from db with access token in the header
bot.on(/^\/user (.+)$/, (msg, props) => {
    let userId = props.match[1];
    console.log(accessToken);
    request({
        url: baseUrl + "/user/" + userId,
        json: true, 
        headers: {
            'content-type' : 'application/json',
            "token": accessToken
        },
    }, (error, response, body) => {
        if(error) 
            console.log(error);
        console.log(body);
        if (!error && response.statusCode === 200) {
            console.log(body);
            //return pretty json
            bot.sendMessage(msg.from.id, JSON.stringify(body, null, 2) );
        }
    });
});


// request acces token
bot.on('/token', (msg) => {
    getAccesToken().then( token => {   
        console.log(token);
        bot.sendMessage(msg.from.id, JSON.stringify(token, null, 2) );
    });
});



// ---- utitlity --------------------

function getAccesToken(){
    return new Promise(function(fulfill, reject){
        console.log("token");
        request.post({
            url: baseUrl + "/token",
            body: {
                "credentials":{
                  "user": "admin",
                  "password": "gymbro_pw"
                }
            },
            json: true, //// Automatically parses the JSON string in the response

        }, (error, response, body) => {
            if(error)
                console.log(error);
             
            if (!error && response.statusCode === 200) {
                fulfill(body)
            }
        });   
      }).catch(console.log);
}




bot.start();

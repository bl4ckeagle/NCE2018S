const request = require("request");

class NCEDefaultBot {
    constructor(bot, accessToken, baseUrl) {

        this.bot = bot;
        this.accessToken = accessToken;
        this.baseUrl = baseUrl;
        this.defaultBot();
    }


    defaultBot() {
        this.bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome to the Healthyliving Bot! :)'));

        this.bot.on('/hello', (msg) => {
            this.bot.sendMessage(msg.from.id, `Hello, ${ msg.from.first_name }!`);
        });

        this.bot.on('/easterEgg',
            (gif) => {
                this.bot.sendVideo(gif.from.id, "./media/easter/oZXvR.gif");
                console.log(gif.from.id);
            });

//get exercise categories
        this.bot.on('/cat', (msg) => {
            //http get request
            request({
                url: this.baseUrl + "/exercise/category",
                json: true //// Automatically parses the JSON string in the response
            }, (error, response, body) => {
                if (error)
                    console.log(error);

                if (!error && response.statusCode === 200) {
                    //console.log(body);
                    //return pretty json
                    this.bot.sendMessage(msg.from.id, JSON.stringify(body.results, null, 2));
                }
            });
        });


//get exercise of specified category
        this.bot.on(/^\/ex (.+)$/, (msg, props) => {
            //http get request
            let catId = props.match[1];

            request({
                url: this.baseUrl + "/exercise/category/" + catId,
                json: true // Automatically parses the JSON string in the response
            }, (error, response, body) => {
                if (error)
                    console.log(error);

                if (!error && response.statusCode === 200) {
                    //return pretty json
                    //show first exercise of this category
                    this.bot.sendMessage(msg.from.id, JSON.stringify(body.results[0], null, 2));
                }
            });
        });


// get a user from db with access token in the header
        this.bot.on(/^\/user (.+)$/, (msg, props) => {
            let userId = props.match[1];
            console.log(this.accessToken);
            request({
                url: this.baseUrl + "/user/" + userId,
                json: true,
                headers: {
                    'content-type': 'application/json',
                    "token": this.accessToken
                },
            }, (error, response, body) => {
                if (error)
                    console.log(error);
                console.log(body);
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    //return pretty json
                    this.bot.sendMessage(msg.from.id, JSON.stringify(body, null, 2));
                }
            });
        });


// request acces token


    }
}

module.exports = NCEDefaultBot;
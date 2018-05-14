const request = require("request");

class TrainingsController {
    constructor(baseUrl, userId, accessToken) {
        this.baseUrl =baseUrl;
        this.userId =userId;
        this.accessToken =accessToken;

    }

    requestTraining()
    {
        request({
            url: this.baseUrl + "/exercise/category/",
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
    }
}

module.exports = TrainingsController; //edit class name
const request = require("request");

class UserController {


    constructor(baseUrl, nceToken) {
        this.baseUrl = baseUrl;
        this.nceToken = nceToken;
    }

    //gets users from the nce api, uses callback and returns the then function for botCommands promise.all
    getUser() {
        let p1 = new Promise(resolve => {
            let options =
                {
                    url: this.baseUrl + "/user/",
                    json: true,
                    headers: {
                        token: this.nceToken
                    }
                };
            request(options, (error, response, body) => {
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
                return res.body
            }
        )
    };


    postUser() {
        request.get({
            url: this.baseUrl + "/exercise/category/",
            json: true // Automatically parses the JSON string in the response
        }, (error, response, body) => {
            if (error)
                console.log(error);

            if (!error && response.statusCode === 200) {
                //return pretty json
                //show first exercise of this category

            }
        });

    }

}

module.exports = UserController; //edit class name
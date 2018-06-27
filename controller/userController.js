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
                    url: this.baseUrl + "/users/",
                    json: true,
                    headers: {
                        token: this.nceToken
                    }
                };
            request.get(options, (error, response, body) => {
                    console.log(response.statusCode);
                    if (error)
                        console.log("get user Throws an error, check");

                    if (!error && response.statusCode === 200) {
                        //return pretty json
                        //show first exercise of this category
                    }
                    resolve({body: body});
                }
            )

        });

        return p1.then(x => {
            return x.body
        });
    }


    postUser(collection) {
        let options = { method: 'POST',
            url: 'http://healthylivingbot.cosy.univie.ac.at:5000/user/',
            headers:
                {   'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4ifQ.OTF_oJRoInPZcBF9Ep2uut73Qd0HY4z0l6ssxyNwXs0' },
            body:
                { NCE2018G1: {
                        lvl: collection.NCE2018G1.lvl,
                        id: collection.NCE2018G1.id,
                        exp: collection.NCE2018G1.exp,
                        name: collection.NCE2018G1.name },
                    telegram_id: collection.NCE2018G1.id,
                    name:collection.NCE2018G1.name},
            json: true };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(collection.id);
            console.log("posted");
            console.log(body);
        });


    }
    updateUser()
    {


    }

}

module.exports = UserController; //edit class name

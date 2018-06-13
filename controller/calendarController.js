const request = require("request");
class CalendarController {
  constructor(baseUrl,userId) {
    this.userId = userId;
    this.baseUrl = baseUrl;
  }

  authentificate(){
    let p1 = new Promise(resolve => {
        let options =
            {
                url: this.baseUrl + "/oauth/user/" + this.userId + "/calendar"
            };
        request.get(options, (error, response, body) => {
                if (error)
                    console.log("authentificate Throws an error, check");

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
  }


  getEvents(calendarName){
    let p1 = new Promise(resolve => {
        let options =
            {
                url: this.baseUrl + "/calendar/user/43/"+calendarName+"/events"
            };
        request.get(options, (error, response, body) => {
                if (error)
                    console.log("authentificate Throws an error, check");

                if (!error && response.statusCode === 200) {
                    //return pretty json
                    //show first exercise of this category
                    resolve({body: body});
                }
            }
        )

    });
    return p1.then((res) => {
            return JSON.parse(res.body)
        }
    )
  }
}
module.exports = CalendarController; //edit class name

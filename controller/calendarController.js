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


  getEvents(userID,calendarName){
    let p1 = new Promise(resolve => {
        let options =
            {
                url: this.baseUrl + "/calendar/user/"+str(userID)+"/"+calendarName+"/events"
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
    ).catch((e)=> {
      console.log(e + "in get Events");
    })
  }

  setEvent(userID,calendarName,eventName,eventDescription,startTime,endTime){

    let p1 = new Promise(resolve => {
          var options = { method: 'POST',
                url:  this.baseUrl + "/calendar/user/"+userID+"/"+calendarName+"/event/",
                headers:
                 { 'postman-token': 'f18b4a80-fb3c-83b3-4d2d-e2146199da12',
                   'cache-control': 'no-cache',
                   'content-type': 'application/json' },
                body: { summary: eventName,
                   start: { dateTime: startTime },
                   end: { dateTime: endTime },
                   description: eventDescription
                 },
                json: true
          };

        request(options, (error, response, body) => {
                        if (error)
                            console.log("set event Throws an error, check : " + error);

                        console.log("code:" + response.statusCode);

                        if (!error && response.statusCode === 200) {
                            //return pretty json
                            //show first exercise of this category
                            resolve({body: body});
                        }
                    })
    });

    return p1.then((res) => {
            return JSON.parse(res.body)
        }
    ).catch((e)=> {
      console.log(e + " in set Event");
    })
  }
}
module.exports = CalendarController; //edit class name

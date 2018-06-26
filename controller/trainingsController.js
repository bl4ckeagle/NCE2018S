const request = require("request");
class TrainingsController {

    constructor(baseUrl, accessToken) {
        this.baseUrl =baseUrl;
        this.accessToken =accessToken;
    }



   requestAllExercises()
    {
      //first request all categories
      let baseUrl = this.baseUrl;
      return new Promise(resolve => {
          let options =
          {
              url: this.baseUrl + "/exercise/category/",
              json: true // Automatically parses the JSON string in the response
          }
          //request all categories
          request(options, (error, response, body) => {
              if (error)
                  console.log(error);

              if (!error && response.statusCode === 200) {
                  //return pretty json
                  //show first exercise of this category
                  resolve({body:body});
              }
          }
        )
      }).then( (res) => {
        //get exercises for each categoryId
        let categories = res.body.results;//exercises by category\

        //categories[0].exercise = "exercise"
        for(let i = 0;i<categories.length;i++){
          //request exercise for category
          let getExercises = new Promise(resolve => {
              let options =
                {
                url: baseUrl + "/exercise/category/"+ categories[i].id,
                json: true // Automatically parses the JSON string in the response
                }
                request(options, (error, response, body) => {
                    if (error)
                      console.log(error);
                    if (!error && response.statusCode === 200) {
                      //return pretty json
                     resolve({body:body});
                    }
                }
                )
          }).then((res) =>{
            categories[i].exercise = res.body.results;
          }).catch((e) => {
            console.log(e + " in training connection");
          });

        }
        return categories
      })
    }
}

module.exports = TrainingsController; //edit class name

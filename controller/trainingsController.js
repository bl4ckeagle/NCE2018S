const request = require("request");
class TrainingsController {

    constructor(baseUrl, userId, accessToken) {
        this.baseUrl =baseUrl;
        this.userId =userId;
        this.accessToken =accessToken;
    }



   requestAllExercises()
    {
      //first request all categories
      let p1 = new Promise(resolve => {
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
      });
      //now we need to get exercises for each category
      let baseUrl = this.baseUrl;
      return p1.then(async function(res) {
        //get exercises for each categoryId
        let categories = res.body.results;//exercises by category\
        for(var i = 0;i<categories.length;i++){
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
          });

          let ex = await getExercises;
          categories[i].exercises = ex.body.results;
        }
        return categories
      })
    }
}

module.exports = TrainingsController; //edit class name

const FS=require('fs');
class exerciseController {

    constructor() {

        this.filereader= FS;
    }

    getExercise()
    {


        let file =this.filereader.readFileSync('Workouts.json','utf8').toString();
        let json = JSON.parse(file);


        return json

    }






}

module.exports = exerciseController; //edit class name

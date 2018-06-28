class Exercise {
    constructor(exercisesCollection) {
        //this.exercisesCollection = JSON.parse(JSON.stringify(exercisesCollection))
        this.exercisesCollection = exercisesCollection
    }



    randomizer(number) {
        let exercises = [];

        for (let i=0; i <= number; i ++)
        {
            let randomize = (Math.floor(Math.random()*100)) % Object.entries(this.exercisesCollection.all).length;
            console.log(randomize);
            exercises.push(this.exercisesCollection.all[randomize]);

        }
        return exercises;

    }

}

module.exports = Exercise;

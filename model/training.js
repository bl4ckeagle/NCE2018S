//TODO create model as in user
class Training{
//  exercise = []



  constructor(exercisesCollection){
    this.exercisesCollection = JSON.parse(JSON.stringify(exercisesCollection))
    //console.log(exercisesCollection.data[0])
    //console.log(this.exercise[0].exercise)
  }

  getRandomExercise() {
    // var category = this.exercisesCollection.data[Math.random() * this.exercisesCollection.data.length]
    // return category[Math.random() * category.length].exercise
    let category = this.exercisesCollection.data[Math.floor(Math.random() * this.exercisesCollection.data.length)]
    return category.exercise[Math.floor(Math.random() * category.exercise.length)]
  }




}


module.exports = Training;

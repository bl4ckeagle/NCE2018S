//TODO create model as in user
class Training{
//  exercise = []



  constructor(exercisesCollection){
    //this.exercisesCollection = JSON.parse(JSON.stringify(exercisesCollection))
    this.exercisesCollection = exercisesCollection
    //console.log(this.exercise[0].exercise)
  }

  getRandomExercise() {
    // var category = this.exercisesCollection.data[Math.random() * this.exercisesCollection.data.length]
    // return category[Math.random() * category.length].exercise
    let category = this.exercisesCollection.data[Math.floor(Math.random() * this.exercisesCollection.data.length)]
    return category.exercise[Math.floor(Math.random() * category.exercise.length)]
  }

  getCategories() {
    //console.log(this.exercisesCollection)
    let categories = this.exercisesCollection.data
    let names = []
    for(let category of categories){
      names.push(category.name)
    }
    return names
  }

  getExercise(categoryName,lvl){
    let category = this.exercisesCollection.findOne({'name':categoryName});

    if(lvl>category.exercise.length){
      lvl = category.exercise.length
    }
    
    let exercises = []
    for(let i = 0; i<lvl; i++ ){
      exercises.push(category.exercise[i])
    }
    return exercises
  }





}


module.exports = Training;

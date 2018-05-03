
class User {


    constructor(name,sex) {

        //Name and Sex
        this.name=name;
        this.sex=sex;
        //level
        this.ArmsLvl = 0;
        this.legsLvl = 0;
        this.absLvl = 0;
        this.chestLvl = 0;
        this.backLvl = 0;
        this.shouldersLvl = 0;
        this.calvesLvl = 0;
        //exp
        this.ArmsExp = 0;
        this.legsExp = 0;
        this.absExp = 0;
        this.chestExp = 0;
        this.backExp = 0;
        this.shouldersExp = 0;
        this.calvesExp = 0;
    }


}
module.exports = User;
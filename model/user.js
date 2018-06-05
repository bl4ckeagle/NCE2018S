class User {


    constructor(id, name, userCollection) {

        //check if user exists if not create a new one with name and id from telegram

        if (userCollection.find({'NCE2018G1.id':id}) !== null) {
           console.log("test");
            console.log(userCollection.find({'NCE2018G1.id':id}));
           if (0 === 0) {
                console.log("what");
            }
        }
        else {
            console.log("new user");
            //id username
            this._id = id;
            this._name = name;
            //level
            this._ArmsLvl = 0;
            this._legsLvl = 0;
            this._absLvl = 0;
            this._chestLvl = 0;
            this._backLvl = 0;
            this._shouldersLvl = 0;
            this._calvesLvl = 0;
            //exp
            this._ArmsExp = 0;
            this._legsExp = 0;
            this._absExp = 0;
            this._chestExp = 0;
            this._backExp = 0;
            this._shouldersExp = 0;
            this._calvesExp = 0;
        }

    }

    //getter
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get ArmsLvl() {
        return this._ArmsLvl;
    }

    get legsLvl() {
        return this._legsLvl;
    }

    get absLvl() {
        return this._absLvl;
    }

    get chestLvl() {
        return this._chestLvl;
    }

    get backLvl() {
        return this._backLvl;
    }

    get shouldersLvl() {
        return this._shouldersLvl;
    }

    get calvesLvl() {
        return this._calvesLvl;
    }

    get ArmsExp() {
        return this._ArmsExp;
    }

    get legsExp() {
        return this._legsExp;
    }

    get absExp() {
        return this._absExp;
    }

    get chestExp() {
        return this._chestExp;
    }

    get backExp() {
        return this._backExp;
    }

    get shouldersExp() {
        return this._shouldersExp;
    }

    get calvesExp() {
        return this._calvesExp;
    }

    //setter

    set ArmsLvl(value) {
        this._ArmsLvl = value;
    }

    set legsLvl(value) {
        this._legsLvl = value;
    }

    set absLvl(value) {
        this._absLvl = value;
    }

    set chestLvl(value) {
        this._chestLvl = value;
    }

    set backLvl(value) {
        this._backLvl = value;
    }

    set shouldersLvl(value) {
        this._shouldersLvl = value;
    }

    set calvesLvl(value) {
        this._calvesLvl = value;
    }

    set ArmsExp(value) {
        this._ArmsExp = value;
    }

    set legsExp(value) {
        this._legsExp = value;
    }

    set absExp(value) {
        this._absExp = value;
    }

    set chestExp(value) {
        this._chestExp = value;
    }

    set backExp(value) {
        this._backExp = value;
    }

    set shouldersExp(value) {
        this._shouldersExp = value;
    }

    set calvesExp(value) {
        this._calvesExp = value;
    }
}

module.exports = User;
const USER_CONTROLLER = require('../controller/userController');

class User {


    constructor(id, name, userCollection) {

        //check if user exists if not create a new one with name and id from telegram
        this.userCollection = userCollection;
        if (this.userCollection.find({'NCE2018G1.id': id}).length > 0) {
            this.myUser = this.userCollection.findOne({'NCE2018G1.id': id});
            console.log(this.myUser.NCE2018G1);

            if (this.myUser.NCE2018G1.id === id) {
                this.id = this.myUser.NCE2018G1.id;
                this.name = this.myUser.NCE2018G1.name;
                this.exp = this.myUser.NCE2018G1.exp;
                this.lvl = this.myUser.NCE2018G1.lvl;
            }
            else {

            }
        }
        else {
            console.log("new user");
            //id username
            this._id = id;
            this._name = name;
            this._exp = 0;
            this._lvl = 0;
        }

    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get userCollection() {
        return this._userCollection;
    }

    set userCollection(value) {
        this._userCollection = value;
    }

    get exp() {
        return this._exp;
    }

    set exp(value) {
        this._exp = +value;
        if (this.exp >= 100) {
            this._lvl = +1;
            this._exp = 0;
            this.levelUp();
            this.myUser.NCE2018G1.exp = this.exp;
            this.myUser.NCE2018G1.lvl = this.lvl;
            this.userCollection.update(this.myUser);
            this.save();

        }
    }

    get lvl() {
        return this._lvl;
    }


    set lvl(value) {
        this._lvl = value;
    }

    levelUp() {
        return "hurray you got an level up"
    }

    save() {
        let userController = new USER_CONTROLLER();

        console.log(this.userCollection.findOne({'NCE2018G1.id': this.id}) === null);
        if (this.myUser = this.userCollection.findOne({'NCE2018G1.id': this.id}) === null) {
            let myUser = {
                id: this.id,
                name: this.name,
                exp: this.exp,
                lvl: this.lvl
            };


            console.log(myUser.name);
            console.log("save");
            userController.postUser(myUser);
        } else {
            console.log();
            console.log("update");
        }

    }
}

module.exports = User;

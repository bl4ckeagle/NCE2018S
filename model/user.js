const USER_CONTROLLER = require('../controller/userController');

class User {


    constructor(id, name, userCollection) {

        //check if user exists if not create a new one with name and id from telegram
        this.userCollection = userCollection;
        this.myUser = {};
        if (this.userCollection.find({'NCE2018G1.id': id}).length > 0) {
            this.myUser = this.userCollection.findOne({'NCE2018G1.id': id});
            console.log(this.myUser.NCE2018G1);

            if (this.myUser.NCE2018G1.id === id) {
                console.log(this.myUser.NCE2018G1.id);
                this._serverId = this.myUser.id;
                this.id = this.myUser.NCE2018G1.id;
                this.name = this.myUser.NCE2018G1.name;
                this.exp = this.myUser.NCE2018G1.exp;
                this.lvl = this.myUser.NCE2018G1.lvl;
                this._mail = this.myUser.NCE2018G1.mail;
            }
            else {

            }
        }
        else {
            console.log("new user");
            console.log(id);
            //id username
            this._id = id;
            this._name = name;
            this._exp = 0;
            this._lvl = 0;
            this._mail="placeholder";
            this.myUser = {
                'name': this.name, 'telegram_id': this.id, 'NCE2018G1': {
                    id: this.id, name: this.name, exp: this.exp, lvl: this.lvl,mail:this._mail
                }

            }

        }
    }


    get mail() {
        return this._mail;
    }

    set mail(value) {
        this._mail = value;
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

    }

    levelUp(exp) {
        this.exp+=exp;
        if (this.exp >= 100) {
            this._lvl = +1;
            this._exp = 0;
            User.levelUpMessage();
            this.myUser.NCE2018G1.exp = this.exp;
            this.myUser.NCE2018G1.lvl = this.lvl;
            this.save();

        }

    }

    get serverId() {
        return this._serverId;
    }

    set serverId(value) {
        this._serverId = value;
    }

    get lvl() {
        return this._lvl;
    }


    set lvl(value) {
        this._lvl = value;
    }

    static levelUpMessage() {
        return "hurray you got an level up"
    }

    save() {
        let userController = new USER_CONTROLLER();


        console.log(typeof  this.myUser.id === 'undefined');
        console.log(this.myUser.id);


        if ((typeof  this.myUser.id === 'undefined')) {


            console.log("save");
            userController.postUser(this.myUser);
        } else {
            this.userCollection.update(this.myUser);
            console.log();
            console.log("update");
        }

    }
}

module.exports = User;

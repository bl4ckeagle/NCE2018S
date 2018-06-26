class User {


    constructor(id, name, userCollection) {

        //check if user exists if not create a new one with name and id from telegram
        this.userCollection=userCollection;
        if (this.userCollection.find({'NCE2018G1.id': id}).length > 0) {
            this.myUser = this.userCollection.findOne({'NCE2018G1.id': id});
            console.log(this.myUser.NCE2018G1);

            if (this.myUser.NCE2018G1.id=== id) {

                this.id=this.myUser.NCE2018G1.id;
                this.name=this.myUser.NCE2018G1.name;
                this.exp=this.myUser.NCE2018G1.exp;
                this.lvl=this.myUser.NCE2018G1.lvl;

                console.log(this.myUser.NCE2018G1.exp);




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
        if (this.exp >=100)
        {
            this._lvl=+1;
            this._exp=0;
            this.levelUp();

        }
    }

    get lvl() {
        return this._lvl;
    }


    set lvl(value) {
        this._lvl = value;
    }

    levelUp()
    {
        return "hurray you got an level up"
    }
    save()
    {

    }
}

module.exports = User;


class Exp{

    constructor(exp,level)
    {
        this._exp = exp;
        this._level = level;
    }


    //getter
    get exp() {
        return this._exp;
    }

    get level() {
        return this._level;
    }

    //setter

    set exp(value) {
        this._exp = value;
    }

    set level(value) {
        this._level = value;
    }

    //
}
module.exports =Exp;
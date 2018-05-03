fs = require('fs');

class Helper {
    static getmykey() {
        let key = "";

        try {
            key = fs.readFileSync('key.txt', 'utf8').toString();
            console.log(key);
        } catch (err) {
            console.log("wrong file path or something else is wrong with the");
        }
        return key;
    };
}

module.exports = Helper;

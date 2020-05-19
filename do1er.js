
const loopbase = require("./src/loopbase");

const helper = require("./utils/helper");

class do1er extends loopbase {
    constructor() {
        super('do1er');
    }
    doWork(callback) {
        helper.logYellow("["+this._name+"] doWork() >>>>>");
        helper.logYellow("["+this._name+"]", "hello world!");
        callback();
    }
}

module.exports = do1er;
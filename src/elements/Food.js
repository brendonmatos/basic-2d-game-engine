const { _Element }  = require("./Element");
class Food extends _Element {
    constructor(type, regenerate) {
        this.type = type
        this.regenerate = regenerate
    }
}

exports.Food = Food
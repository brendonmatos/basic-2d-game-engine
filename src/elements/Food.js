const { _Element }  = require("./Element");
class Food extends _Element {
    constructor(type, regenerate) {
        super()
        this.type = type
        this.regenerate = regenerate
    }
}

exports.Food = Food
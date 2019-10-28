const { Element } = require("./Element");
class Food extends Element {
    constructor(type, regenerate) {
        this.type = type
        this.regenerate = regenerate
    }
}

exports.Food = Food
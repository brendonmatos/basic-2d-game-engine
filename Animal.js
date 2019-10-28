const { Element } = require("./Element");
class Animal extends Element {
    constructor(position, size = {x: 50, y: 50}) {
        super(position, size);
        this.life = 10;
        this.degradationRate = 0.001;
    }
    update() {
        super.update()
        this.life -= this.degradationRate;
    }
}
exports.Animal = Animal
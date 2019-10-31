const { _Element } = require("./Element");
const { Life } = require("../components/Life")
class Creature extends _Element {
    constructor(position, size = {x: 50, y: 50}) {
        super(position, size);

        this.life = new Life()
        this.degradationRate = 0.001;

    }
    update() {
        super.update()
        this.life -= this.degradationRate;
    }
}
exports.Creature = Creature
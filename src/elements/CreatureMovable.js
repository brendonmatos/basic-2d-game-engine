import { Movement } from "../components/Movement";
const { Creature } = require("./Creature");
export class CreatureMovable extends Creature {

    constructor(position, settings = {}) {
        super(position, { x: 20, y: 20 });
        this.maxVelocity = settings.maxVelocity || 2;
        this.movement = new Movement(this);
    }
    
    update() {
        super.update();
        this.movement.update()
    }

    draw(ctx) {
        super.draw(ctx)
        ctx.font = "10px Arial";
        ctx.fillText("Degrees: " + this.movement.degrees, this.position.x, this.position.y);
    }
}

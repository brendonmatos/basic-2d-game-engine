const { Animal } = require("./Animal");
class AnimalMover extends Animal {

    constructor(position, settings = {}) {
        super(position, { x: 20, y: 20 });
        this.maxVelocity = settings.maxVelocity || 2;
        this.movement = { degrees: 0, velocity: 0 };
    }
    
    setTowards(position) {
        this.movement.degrees = this.getAngleTo(position);
    }
    
    moveToPosition(position) {
        this.movement.destination = position
        this.movement.velocity = this.maxVelocity / 2
    }

    stopMovement() {
        this.movement.destination = null
        this.movement.velocity = 0
    }
    
    update() {
        super.update();
        this.position.x += Math.cos(this.movement.degrees * Math.PI / 180) * this.movement.velocity;
        this.position.y += Math.sin(this.movement.degrees * Math.PI / 180) * this.movement.velocity;

        if( this.movement.destination ) {
            this.setTowards(this.movement.destination)
            if( this.getDistanceToPosition( this.movement.destination ) < this.dimensions.x / 2 ) {
                this.stopMovement()
            }
        }
    }

    draw(ctx) {
        super.draw(ctx)
        ctx.font = "10px Arial";
        // ctx.fillText("Degrees: " + this.movement.degrees, this.position.x, this.position.y);
    }
}
exports.AnimalMover = AnimalMover;

export class Movement { 
    constructor( element ) {
        this.element = element
        this.degrees =  0
        this.velocity = 0 
        this.maxVelocity = 3
        this.destination = null
    }

    setTowards(position) {
        this.degrees = this.element.getAngleTo(position);
    }
    
    moveToPosition(position) {
        this.destination = position
        this.velocity = this.maxVelocity / 2
    }

    stopMovement() {
        this.destination = null
        this.movement.velocity = 0
    }

    update() {
        this.element.position.x += Math.cos(this.degrees * Math.PI / 180) * this.velocity;
        this.element.position.y += Math.sin(this.degrees * Math.PI / 180) * this.velocity;

        if( this.destination ) {
            this.setTowards(this.destination)
            if( this.element.getDistanceToPosition( this.destination ) < this.element.dimensions.x / 2 ) {
                this.stopMovement()
            }
        }
    }
}
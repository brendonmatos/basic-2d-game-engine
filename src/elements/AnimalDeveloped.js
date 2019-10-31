const { CreatureMovable } = require("./CreatureMovable");
const { FieldOfView } = require("../components/FieldOfView")
const { FOVTagsNotifier } = require("../components/FOVTagsNotifier")
const { Tags } = require('../components/Tags')

class AnimalDeveloped extends CreatureMovable {
    constructor(position, settings) {
        super(position, settings);
        
        this.fears = [] // Move fear to a separated component
        this.foods = []
        
        this.runningFrom = []

        this.fov = new FieldOfView(this)
        this.fovNotifier = new FOVTagsNotifier(this, this.fov)
        
        this.tags = new Tags(this)
        this.tags.add('predator')

        this.lookingTo;

        this.on( 'predator-enter', (element) => {
            this.lookingTo = element
        })

        this.on( 'predator-out', (element) => {
            this.lookingTo = undefined
        } )
    }

    setContext(context) {
        super.setContext(context)
        this.fovNotifier.start()
    }

    runFrom(element) {

        if( this.runningFrom.indexOf(element) >= 0 ) {
            return 
        }
        this.movement.setTowards(element.position)
        this.movement.degrees += 180
        this.movement.velocity = (( element.maxVelocity / element.movement.velocity ) + 0.1) * this.maxVelocity
        this.runningFrom.push(element)
    }

    update() {
        super.update()

        if( this.lookingTo ) {
            this.movement.setTowards(this.lookingTo.position)
        }
    }

    draw(ctx) {
        super.draw(ctx)

        this.fov.debug(ctx);

        // ctx.font = "10px Arial";
        // let i = 0
        // for (const element of this.getContext().elements) {

        //     if (element === this ) {
        //         continue
        //     }
           
        //     ctx.fillText("Degrees: " + this.getAngleTo(element.position), this.position.x + 30, this.position.y + ( 20 * i ));
        //     i++;
        //     if ( this.fov.has(element) ) {

        //         this.drawLineInside(ctx, this.getAngleTo(element.position), this.getDistanceToElement(element))
        
        //     } 
        // }
    }
}
exports.AnimalDeveloped = AnimalDeveloped;

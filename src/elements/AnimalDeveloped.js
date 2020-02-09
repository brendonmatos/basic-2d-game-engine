const { CreatureMovable } = require("./CreatureMovable");
const { FieldOfView } = require("../components/FieldOfView")
const { FOVTagsNotifier } = require("../components/FOVTagsNotifier")
const { Tags } = require('../components/Tags')

class AnimalDeveloped extends CreatureMovable {
    constructor(position, settings) {
        super(position, settings);
        

        this.fov = new FieldOfView(this)
        this.fovNotifier = new FOVTagsNotifier(this, this.fov)
        
        this.tags = new Tags(this)
        this.tags.add('predator')

        this.lookingTo;
        this.runningFrom;
        this.canvasSize;

        this.on( 'predator-enter', (element) => {
            this.lookingTo = element
        })

        this.on( 'predator-out', (element) => {
            if( this.lookingTo === element ) {
                this.lookingTo = undefined
            }
        } )
    }

    setContext(context) {
        super.setContext(context)
        this.fovNotifier.start()
    }

    // runFrom(element) {

    //     if( this.runningFrom.indexOf(element) >= 0 ) {
    //         return 
    //     }
    //     this.movement.setTowards(element.position)
    //     this.movement.degrees += 180
    //     this.movement.velocity = (( element.maxVelocity / element.movement.velocity ) + 0.1) * this.maxVelocity
    //     this.runningFrom.push(element)
    // }

    runFrom() {

    }

    update() {

        super.update()

        if( this.runningFrom ) {
            this.movement.velocity = this.movement.maxVelocity
            
            if( this.getDistanceToElement(this.runningFrom) > 100 ) {
                this.runningFrom = undefined
            }
        } else {
            this.movement.velocity = 0
        }
        
        if( this.lookingTo ) {
            if( this.getDistanceToElement(this.lookingTo) < 50 ) {
                this.movement.degrees += 180
                this.runningFrom = this.lookingTo
                this.lookingTo = undefined
            } else {
                this.movement.setTowards(this.lookingTo.position)
            }
        }

        if( this.canvasSize ) {

            if( ((this.position.x) > this.canvasSize.width - this.dimensions.x) || this.position.x < 0 ) {
                this.movement.degrees += 180
            }

            if( ((this.position.y) > this.canvasSize.height - this.dimensions.y) || this.position.y < 0 ) {
                this.movement.degrees += 180
            }
        }

    }

    draw(ctx) {
        super.draw(ctx)
        this.fov.debug(ctx);

        if( !this.canvasSize ) {
            this.canvasSize = {
                width: ctx.canvas.clientWidth,
                heigth: ctx.canvas.clientHeight
            }
        }


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

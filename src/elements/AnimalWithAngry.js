const { AnimalMover } = require("./AnimalMover");
const { FieldOfView } = require("../components/FieldOfView")
const { FOVTagsNotifier } = require("../components/FOVTagsNotifier")
class AnimalWithAngry extends AnimalMover {
    constructor(position, settings) {
        super(position, settings);
        
        this.fears = [] // Move fear to a separated component
        this.foods = []
        
        this.runningFrom = []
        this.viewDistance = 100
        this.viewAngleRange = 34
        this.maxVelocity = 1

        this.fov = new FieldOfView(this)
        this.fov.notifier = new FOVTagsNotifier(this)

        this.messages.on('second', () => this.fov.notifier.update());
        
        this.messages.on('see', (element) => {
            if( this.hasFearOf(element) ) {
                this.notifyFearWithNear(element)
                this.runFrom(element)
            }

            if( this.isFood(element) ){
                this.movement.moveToPosition(element.position)
            }
        });
        
        this.messages.on('fear', (data) => {
            this.runFrom(data)
        });

        this.messages.on('outofview', (data) => {
            const pos = this.runningFrom.indexOf(data)
            
            if( pos < 0 ) {
                return
            }
        
            this.runningFrom.splice(pos, 1)

            setTimeout( i => {
                this.movement.degrees += 180
                this.movement.velocity = 0
            }, 500)
        })
    }

    hasFearOf( element ) {
        return this.fears.some( fear => fear.type === element.type )
    }

    isFood( element ) {
        return this.foods.some( food => food.type === element.type ) 
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

    notifyFearWithNear(data) {
        const notFearedElements = this.getContext().elements.filter( element => {
            return this.fears.some( fear => fear.type !== element.type )
        })

        for (const element of notFearedElements ) {
            element.emit('fear', data)
        }
    }

    
    

    draw(ctx) {
        super.draw(ctx)

        this.fov.debug(ctx);

        ctx.font = "10px Arial";
        let i = 0
        for (const element of this.getContext().elements) {

            if (element === this ) {
                continue
            }
           
            ctx.fillText("Degrees: " + this.getAngleTo(element.position), this.position.x + 30, this.position.y + ( 20 * i ));
            i++;
            if ( this.fov.has(element) ) {

                this.drawLineInside(ctx, this.getAngleTo(element.position), this.getDistanceToElement(element))
        
            } 
        }
    }

    update() {
        super.update()
    }
}
exports.AnimalWithAngry = AnimalWithAngry;

const { AnimalMover } = require("./AnimalMover");
const { Tags } = require( '../components/Tags' )
const { FieldOfView } = require("../components/FieldOfView")
class AnimalWithFear extends AnimalMover {
    constructor(position, settings) {
        super(position, settings);

        this.fears = [{tag: 'animal'}] // Move fear to a separated component
        this.foods = [{type: 'player'}]
        this.tags = new Tags(this)
        
        this.tags.add('animal')
        this.tags.add('prey')

        this.runningFrom = []
        this.viewDistance = 100
        this.viewAngleRange = 34

        this.fieldOfView = new FieldOfView(this)

        this.messages.on('second', () => this.verifyVision());
        
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

        this.setTowards(element.position)
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

    verifyVision() {

        const elements = this.getContext().elements

        for (const element of elements) {

            if (element === this ) {
                continue
            }
            
            if ( this.fieldOfView.has(element) ) {
                this.messages.emit('see', element);
            } else {
                this.messages.emit('outofview', element)
            }
        }
    }

    draw(ctx) {
        super.draw(ctx)
        this.fieldOfView.debug(ctx)
    }
}
exports.AnimalWithFear = AnimalWithFear;

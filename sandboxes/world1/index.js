
const { World } = require("../../src/lib/World");
const { AnimalDeveloped } = require("../../src/elements/AnimalDeveloped");
const { AnimalPlayer } = require("../../src/elements/AnimalPlayer");
const { Food } = require("../../src/elements/Food");

const world = new World()

// ambient.addElement( new AnimalMover({x: 1, y: 1}) )
// world.addElement( new AnimalWithFear({x: 500, y: 100}, {maxVelocity: 3}) )
const range = Array.from({length: 5})
for( const x in range ) {
    for( const y in range ) {
        const animal = new AnimalDeveloped({x: 600 * Math.random(), y: 400 * Math.random() }, {maxVelocity: 3})
        animal.fov.distance = 70
        animal.fov.angle = 90
        animal.movement.degrees = Math.random() * 360
        animal.movement.velocity = animal.movement.maxVelocity * Math.random()
        world.addElement( animal )
    }
}
// world.addElement( new Food( 'alive-meat', 0.3 ) )
// world.addElement( new AnimalWithFear({x: 280, y: 200}, {maxVelocity: 3}) )
// world.addElement( new AnimalWithFear({x: 280, y: 280}, {maxVelocity: 3}) )
// world.addElement( new AnimalWithFear({x: 200, y: 280}, {maxVelocity: 3}) )
world.addElement( new AnimalPlayer({x: 20, y: 20}) )

// ambient
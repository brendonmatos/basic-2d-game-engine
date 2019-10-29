
const { World } = require("./lib/World");
const { AnimalWithFear } = require("./elements/AnimalWithFear");
const { AnimalWithAngry } = require("./elements/AnimalWithAngry");
const { AnimalPlayer } = require("./elements/AnimalPlayer");
const { Food } = require("./elements/Food");

const world = new World()

// ambient.addElement( new AnimalMover({x: 1, y: 1}) )
world.addElement( new AnimalWithFear({x: 500, y: 100}, {maxVelocity: 3}) )
world.addElement( new AnimalWithAngry({x: 380, y: 100}, {maxVelocity: 3}) )
// world.addElement( new Food( 'alive-meat', 0.3 ) )
// world.addElement( new AnimalWithFear({x: 280, y: 200}, {maxVelocity: 3}) )
// world.addElement( new AnimalWithFear({x: 280, y: 280}, {maxVelocity: 3}) )
// world.addElement( new AnimalWithFear({x: 200, y: 280}, {maxVelocity: 3}) )
world.addElement( new AnimalPlayer({x: 20, y: 20}) )

// ambient
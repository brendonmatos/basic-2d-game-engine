const { CreatureMovable } = require("./CreatureMovable");
const { MouseController } =  require("../lib/MouseController");
const { KeyboardController } =  require("../lib/KeyboardController")
const { FieldOfView } = require("../components/FieldOfView")
const { Viewer } = require("../components/Viewer")
const { Tags } = require('../components/Tags')

class AnimalPlayer extends CreatureMovable {
    constructor(position) {
        super(position);
        this.type = 'player'

        this.mouse = new MouseController();
        this.keyboard = new KeyboardController();
        this.viewer = new Viewer(this);
        this.fov = new FieldOfView(this)
        
        this.tags = new Tags(this)
        this.tags.add('predator')

    }

    setContext(context) {
        super.setContext(context)
        this.viewer.start()
    }

    update() {
        super.update();
        this.movement.setTowards(this.mouse.position)

        if( this.getDistanceToPosition(this.mouse.position) > 30 ) {
            this.movement.velocity = this.keyboard.key.shift ? this.maxVelocity : 0;
        } else {
            this.movement.velocity = 0
        }
    }

    draw(ctx) {

        super.draw(ctx)
        this.fov.debug(ctx)
        this.mouse.debug(ctx)
    }
}
exports.AnimalPlayer = AnimalPlayer;

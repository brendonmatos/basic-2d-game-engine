const { AnimalMover } = require("./AnimalMover");
const { MouseController } =  require("../lib/MouseController");
const { KeyboardController } =  require("../lib/KeyboardController")
const { FieldOfView } = require("../components/FieldOfView")
const { Viewer } = require("../components/Viewer")

class AnimalPlayer extends AnimalMover {
    constructor(position) {
        super(position);
        this.type = 'player'
        this.mouse = new MouseController();
        this.keyboard = new KeyboardController();

        this.viewer = new Viewer(this);
        this.fov = new FieldOfView(this)

        this.viewDistance = 1000
        this.viewAngleRange = 34
        
    }

    setContext(context) {
        super.setContext(context)

        this.viewer.start()
    }

    update() {
        super.update();
        this.setTowards(this.mouse.position)
        this.movement.velocity = this.keyboard.key.shift ? this.maxVelocity : 0;
    }

    draw(ctx) {

        super.draw(ctx)
        this.fov.debug(ctx);
        // ctx.font = "10px Arial";
        // ctx.fillText("mouseX: " + this.mouse.position.x, this.mouse.position.x, this.mouse.position.y);
        // ctx.fillText("mouseY: " + this.mouse.position.y, this.mouse.position.x, this.mouse.position.y + 10);
        // ctx.fillText("degrees: " + this.movement.degrees, this.mouse.position.x, this.mouse.position.y + 20);

    }
}
exports.AnimalPlayer = AnimalPlayer;

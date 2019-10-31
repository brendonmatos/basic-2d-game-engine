const { CreatureMovable } = require("./CreatureMovable");
const { MouseController } =  require("../lib/MouseController");
const { KeyboardController } =  require("../lib/KeyboardController")
const { FieldOfView } = require("../components/FieldOfView")
const { Viewer } = require("../components/Viewer")

class AnimalPlayer extends CreatureMovable {
    constructor(position) {
        super(position);
        
        this.mouse = new MouseController();
        this.keyboard = new KeyboardController();
        this.viewer = new Viewer(this);
        this.fov = new FieldOfView(this)
    }

    setContext(context) {
        super.setContext(context)
        
        this.viewer.start()
    }

    update() {
        super.update();
    }

    draw(ctx) {
        super.draw(ctx)
        this.fov.debug(ctx)
    }
}
exports.AnimalPlayer = AnimalPlayer;

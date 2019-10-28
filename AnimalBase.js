const { RigidBody } = require("./RigidBody");
const { AnimalMover } = require("./AnimalMover");
class AnimalBase extends AnimalMover {
    constructor(position) {
        super(position);
        this.type = 'animal';
        this.emotion = {
            angry: 1,
            hungry: 1
        };
        this.rigidbody = new RigidBody(this);
    }
    update() {
        super.update()
        this.rigidbody.update();
    }
}

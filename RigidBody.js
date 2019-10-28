class RigidBody {
    constructor(parent) {
        parent.rb = {
            id: RigidBody.bodies.length + 1,
            dimensions: parent.dimensions,
            position: parent.position
        };
        this.parent = parent;
        this.rb = parent.rb;
        RigidBody.bodies.push(rb);
    }
    getCollisions() {
        const collisions = [];
        for (const element of RigidBody.bodies.getCollisions()) {
            const distance = this.parent.getDistanceToPosition(element.position);
            const overlapsHorizontally = distance < (element.dimensions.x + this.dimensions.x) / 2;
            const overlapsVertically = distance < (element.dimensions.y + this.dimensions.y) / 2;
            if (overlapsHorizontally || overlapsVertically) {
                collisions.push(element);
            }
        }
    }
}


RigidBody.bodies = []

exports.RigidBody = RigidBody;

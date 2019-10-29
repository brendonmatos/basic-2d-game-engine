const { Viewer } = require("../components/Viewer");
class World {
    constructor() {
        this.elements = [];
        setInterval(i => {
            this.elements.map(i => {
                i.emit('second');
            });
        }, 1000);
        setInterval(i => {
            this.updateTime();
        }, 1000 / 60);
    }
    
    addElement(element) {
        element.setContext(this);
        this.elements.push(element);
    }

    updateTime() {
        for (const element of this.elements) {
            element.update();
        }
    }
    
    getElements() {
        return this.elements || [];
    }
}
exports.World = World;

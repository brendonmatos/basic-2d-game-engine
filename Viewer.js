class Viewer {
    constructor(world) {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.world = world;
        this.render = this.render.bind(this);
        this.paused = false;
        this.timeScale = 1;
        this.render();
    }
    render() {
        this.actualRender = Date.now();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const element of this.world.getElements()) {
            element.draw(this.ctx)
        }
        this.lastRender = this.actualRender;
        requestAnimationFrame(this.render);
    }
}

exports.Viewer = Viewer

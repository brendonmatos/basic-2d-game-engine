class Viewer {
    constructor(element) {
        this.element = element
        
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.render = this.render.bind(this);
        this.paused = false;
        this.timeScale = 1;
    }

    start() {
        this.render()
    }

    render() {
        this.actualRender = Date.now();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const elements = this.element.context.getElements();
        
        this.element.draw(this.ctx)

        for (const element of elements) {
            
            if( this.element.fov.has( element ) ) {
                element.draw(this.ctx)
            }
        }
        this.lastRender = this.actualRender;
        requestAnimationFrame(this.render);
    }
}

exports.Viewer = Viewer

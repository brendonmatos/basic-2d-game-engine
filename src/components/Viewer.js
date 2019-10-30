class Viewer {
    constructor(element) {
        this.element = element
        
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.render = this.render.bind(this);
        this.paused = false;
        this.timeScale = 1;
        this.elements = []

        this.framesPerSecond = 0
        this.lastFramesPerSecond = 0
    }

    start() {
        this.elements = this.element.context.getElements();
        this.render()
    }

    render() {
        this.actualRenderTime = performance.now();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const elements = this.elements
        
        // Draw self element
        // this.element.draw(this.ctx)

        // Get all elements from page
        for (const element of elements) {
            
            // Verify if is in fov of player
            // if( this.element.fov.has( element ) ) {
                element.draw(this.ctx)
            // }
        }
        this.ctx.font = "10px Arial";
        this.ctx.fillText( "FPS: " + this.framesPerSecond.toFixed(2), 10, 10);
        
        // this.ctx.
        if( ( this.actualRenderTime - this.lastFramesPerSecond ) > 100 ) {
            this.framesPerSecond = ( 1/ ( ( this.actualRenderTime - this.lastRenderTime )/1000 ) )
            this.lastFramesPerSecond = this.actualRenderTime
        }

        this.lastRenderTime = this.actualRenderTime;
        requestAnimationFrame(this.render);
    }
}

exports.Viewer = Viewer

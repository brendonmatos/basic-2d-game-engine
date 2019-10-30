class MouseController {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.canvas = document.getElementById("myCanvas");
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.position = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }, false);
    }

    debug(ctx) {

        ctx.font = "10px Arial";
        ctx.fillText("mouseX: " + this.position.x, this.position.x, this.position.y);
        ctx.fillText("mouseY: " + this.position.y, this.position.x, this.position.y + 10);
    }
}

exports.MouseController = MouseController
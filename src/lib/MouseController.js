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
}

exports.MouseController = MouseController
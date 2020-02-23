import {Vector2} from "../Vector2";

export class ScreenInterface {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
    }

    renderLine(vectorStart: Vector2, vectorEnd: Vector2, color: string) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(vectorStart.x, vectorStart.y);
        this.ctx.lineTo(vectorEnd.x, vectorEnd.y);
        this.ctx.stroke();
        this.ctx.restore();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
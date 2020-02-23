import {Vector2} from "../Vector2";
import {_Component} from "../Component";

export class MouseController extends _Component{
    position: Vector2;
    private canvas: HTMLElement;

    constructor() {
        super()
        this.position = new Vector2(0, 0)
        this.canvas = document.getElementById("myCanvas");
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.position.x = e.clientX - rect.left
            this.position.y = e.clientY - rect.top
        }, false);
    }
}
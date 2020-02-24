import {Vector2} from "../Vector2";
import {_Element} from "../Element";
import {Position2d} from "./Position2d";

export class MouseController extends _Element{
    position: Position2d;
    private canvas: HTMLElement;

    constructor() {
        super({
            position: new Position2d(0, 0)
        })
        this.position = this.getComponent<Position2d>('position');


        this.canvas = document.getElementById("myCanvas");
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.position.vector2.x = e.clientX - rect.left
            this.position.vector2.y = e.clientY - rect.top
        }, false);
    }
}
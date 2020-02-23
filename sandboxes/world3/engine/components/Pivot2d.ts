import {Vector2} from "../Vector2";
import {_Component} from "../Component";

export class Pivot2d extends _Component{
    relativePosition : Vector2;

    constructor(x: number, y: number) {
        super()
        this.relativePosition = new Vector2(50, 50)
    }
}
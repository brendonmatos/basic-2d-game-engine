import {Vector2} from "../Vector2";
import {_Component} from "../Component";

export class Position2d extends _Component{
    vector2 : Vector2;

    constructor(x: number, y: number) {
        super()
        this.vector2 = new Vector2(x, y)
    }
}
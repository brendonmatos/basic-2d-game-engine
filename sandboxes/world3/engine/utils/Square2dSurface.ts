import {Mesh2d} from "../render/Mesh2d";
import {Vector2} from "../Vector2";

export function SquareSurface() {
    return [
        new Mesh2d(new Vector2(0, 0), new Vector2(40, 0)),
        new Mesh2d(new Vector2(40, 0), new Vector2(40, 40)),
        new Mesh2d(new Vector2(40, 40), new Vector2(0, 40)),
        new Mesh2d(new Vector2(0, 0), new Vector2(0, 40)),
    ];
}
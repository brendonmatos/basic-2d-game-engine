import {Mesh2d} from "../render/Mesh2d";
import {Vector2} from "../Vector2";

export function PentagonSurface() {
    return [
        new Mesh2d(new Vector2(0, -50), new Vector2(-48, -15)),
        new Mesh2d(new Vector2(-48, -15), new Vector2(-29, 40)),
        new Mesh2d(new Vector2(-29, 40), new Vector2(29, 40)),
        new Mesh2d(new Vector2(29, 40), new Vector2(48, -15)),
        new Mesh2d(new Vector2(48, -15), new Vector2(0, -50)),
    ];
}

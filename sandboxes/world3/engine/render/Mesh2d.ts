import {Vector2} from "../Vector2";
import {Line2d} from "../Line2d";

export class Mesh2d {
    start: Vector2;
    end: Vector2;
    color: string;
    constructor(start: Vector2, end: Vector2, color = '#000') {
        this.start = start
        this.end = end
        this.color = color
    }

    getAsLine() {
        return new Line2d(this.start, this.end);
    }

    static fromLine(line: Line2d) {
        return new Mesh2d(line.a, line.b);
    }
}
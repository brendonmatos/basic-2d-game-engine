import {Vector2} from "./Vector2";

export class Line2d {
    a: Vector2;
    b: Vector2;

    constructor(a: Vector2, b: Vector2) {
        this.a = a
        this.b = b
    }

    isIntersecting(line: Line2d) {
        const {x: a, y: b} = this.a
        const {x: c, y: d} = this.b
        const {x: p, y: q} = line.a
        const {x: r, y: s} = line.b
        let det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return false;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    }
}
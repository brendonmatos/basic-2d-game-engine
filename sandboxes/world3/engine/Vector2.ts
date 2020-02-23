import {Line2d} from "./Line2d";


export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    addVector(vector: Vector2) {
        this.x += vector.x
        this.y += vector.y
        return this
    }

    sum(vector: Vector2) {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }

    isPointBetween(point: Vector2, betweenPoint: Vector2) {
        const a = this.distance(betweenPoint)
        const b = betweenPoint.distance(point)
        const c = point.distance(this)
        return a ** 2 + b ** 2 >= c ** 2 && a ** 2 + c ** 2 >= b ** 2
    }

    distance(vector: Vector2) {
        return Math.sqrt((this.x - vector.x) ** 2 + (this.y - vector.y) ** 2)
    }

    lineTo(position: Vector2) {
        return new Line2d(this, position)
    }
}
import {Mesh2d} from "../render/Mesh2d";
import {Vector2} from "../Vector2";
import {_Element} from "../Element";
import {_Component} from "../Component";
import {Rotation2d} from "./Rotation2d";
import {Pivot2d} from "./Pivot2d";
import {Position2d} from "./Position2d";


export class Surface2d extends _Component{
    meshes: Mesh2d[];

    constructor(meshes: Mesh2d[]) {
        super()
        this.meshes = meshes
    }

    getRotatedPoint(v: Vector2){
        const rotation = this.getElement().getComponent<Rotation2d>('rotation');
        const pivot = this.getElement().getComponent<Pivot2d>('pivot').relativePosition;
        const radians = rotation.radians;
        const newX = pivot.x + (v.x-pivot.x) * Math.cos(radians) - (v.y-pivot.y) * Math.sin(radians);
        const newY = pivot.y + (v.x-pivot.x) * Math.sin(radians) + (v.y-pivot.y) * Math.cos(radians);
        return new Vector2(newX, newY)
    }

    getMeshes() {
        const meshes = []
        const position = this.getElement().getComponent<Position2d>('position');
        for( const mesh2d of this.meshes ) {
            const startRotated = this.getRotatedPoint( mesh2d.start )
            const endRotated = this.getRotatedPoint( mesh2d.end )
            meshes.push(new Mesh2d(startRotated.addVector(position.vector2), endRotated.addVector(position.vector2)))
        }


        return meshes
    }
}






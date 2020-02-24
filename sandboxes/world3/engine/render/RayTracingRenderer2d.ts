import {Mesh2d} from "./Mesh2d";
import {ScreenInterface} from "./ScreenInterface";

import {Surface2d} from "../components/Surface2d";
import {Position2d} from "../components/Position2d";

import {Vector2} from "../Vector2";
import {Line2d} from "../Line2d";
import {_Element} from "../Element";

export class RayTracingRenderer2d extends _Element {
    private isPaused: any;
    screenInterface: ScreenInterface;
    position: Position2d;
    visibleMeshes: Mesh2d[];
    private visiblePoints: {};

    constructor() {

        super({
            position: new Position2d(100, 300)
        });


        this.screenInterface = new ScreenInterface()
        this.visibleMeshes = []
        this.visiblePoints = {}

        this.position = this.getComponent<Position2d>('position')

    }

    start() {
        this.renderQueue()
        //
        setInterval(() => {

            for (const element of this.parent.getChildren()) {
                element.update()
            }

            // this.updateVisibleMeshes()

        }, 30)
    }

    isCachedPointRendered(point) {
        const key = point.x + ':' + point.y
        return this.visiblePoints[key]
    }

    isPointVisible(point: Vector2, meshes: Mesh2d[]) {
        const line = new Line2d(point, this.position.vector2)

        for (const mesh of meshes) {
            if (line.isIntersecting(mesh.getAsLine())) {
                return false;
            }
        }
        return true

    }

    // MEshes is vectors
    updateVisibleMeshes() {
        const children = this.parent.getChildren()


        this.visiblePoints = {}

        for (const element of children) {

            let surface : Surface2d;
            try {
                surface = element.getComponent<Surface2d>('surface')

                const meshes = surface.getMeshes()


                for (const mesh of meshes) {


                    if (this.isCachedPointRendered(mesh.start)) {
                        if (this.isCachedPointRendered(mesh.end)) {
                            this.visibleMeshes.push(mesh)
                            this.visibleMeshes.push(new Mesh2d(mesh.end, this.position.vector2, '#0000000f'))
                            continue
                        }

                        if (this.isPointVisible(mesh.end, meshes)) {
                            this.visibleMeshes.push(mesh)
                            this.visibleMeshes.push(new Mesh2d(mesh.end, this.position.vector2, '#0000000f'))
                            continue
                        }
                    } else {
                        if (this.isPointVisible(mesh.start, meshes)) {
                            this.visibleMeshes.push(mesh)
                            this.visibleMeshes.push(new Mesh2d(mesh.start, this.position.vector2, '#0000000f'))
                            continue
                        }
                    }

                    // mesh.color = '#000000'
                    // this.visibleMeshes.push(mesh)

                }


            } catch (e) {
                continue
            }
            // this.visibleMeshes.push(new Mesh2d(element.position.sum(element.pivot), element.position.sum(element.pivot).sum(new Vector2(1, 1))))
        }

    }

    renderVisibleMeshes() {
        this.screenInterface.clear();

        let mesh2d;

        while ((mesh2d = this.visibleMeshes.pop())) {
            this.screenInterface.renderLine(mesh2d.start, mesh2d.end, mesh2d.color)
        }

        // this.screenInterface.renderLine(this.position, this.position.sum(new Vector2(30,30)), "#FF0000")
    }

    renderQueue() {


        // Calculate, and uptate all the visible meshes to the camera
        this.updateVisibleMeshes()

        requestAnimationFrame(() => {

            // TODO: remove this call
            this.renderVisibleMeshes();

            if (this.isPaused) {
                return;
            }
            this.renderQueue()
        })

    }

    pause() {

    }

}
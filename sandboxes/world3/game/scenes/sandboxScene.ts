import {RayTracingRenderer2d} from "../../engine/render/RayTracingRenderer2d";
import {MouseController} from "../../engine/components/MouseController";
import {Vector2} from "../../engine/Vector2";
import {Player2d} from "../prefabs/Player2d";
import {World} from "../common/world";
import {_Scene} from "../../engine/Scene";



export class SandboxScene extends _Scene {
    setup() {

        const world = new World();

        // Adds the camera to the world
        const camera = new RayTracingRenderer2d()
        camera.setParent( world )


        const mouse = new MouseController()
        camera.position.vector2 = mouse.position;

        // Create players in the world
        for( const index in Array.from({length: 200}) ) {
            const player = new Player2d(new Vector2(Math.random() * 500,Math.random() * 400))
            player.setParent(world)
        }

        camera.start()
    }
}

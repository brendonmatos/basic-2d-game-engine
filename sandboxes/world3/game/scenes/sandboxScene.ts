import {RayTracingRenderer2d} from "../../engine/render/RayTracingRenderer2d";
import {MouseController} from "../../engine/components/MouseController";
import {Vector2} from "../../engine/Vector2";
import {Player2d} from "../prefabs/Player2d";
import {World} from "../common/world";
import {_Scene} from "../../engine/Scene";
import {EnemyPentagon} from "../prefabs/EnemyPentagon";
import {EnemyRandom} from "../prefabs/EnemyRandom";



export class SandboxScene extends _Scene {
    setup() {

        const world = new World();

        // Create and adds the camera to the world
        const camera = new RayTracingRenderer2d()
        camera.setParent( world )

        // Create and adds the mouse changes to the world
        const mouse = new MouseController()
        mouse.setParent( world );

        // Set the camera position to the mouse position
        camera.position.vector2 = mouse.position.vector2;

        // Create random players in the world
        for( const index in Array.from({length: 50}) ) {
            const enemy = new EnemyPentagon(new Vector2(Math.random() * 500,Math.random() * 400))
            enemy.setParent(world)
        }

        for( const index in Array.from({length: 50}) ) {
            const enemy = new EnemyRandom(new Vector2(Math.random() * 500,Math.random() * 400))
            enemy.setParent(world)
        }

        camera.start()
    }
}

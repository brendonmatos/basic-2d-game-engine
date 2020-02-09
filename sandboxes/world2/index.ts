class RIP {
    private numOfPoints: number;
    private minCoordVal: number;
    private maxCoordVal: number;
    private isIntCoord: boolean;
    constructor(opts) {
        this.numOfPoints = opts.numOfPoints;
        this.minCoordVal = opts.minCoordVal;
        this.maxCoordVal = opts.maxCoordVal;
        this.isIntCoord = !!opts.isIntCoord;
    }

    getPolygonCoord() {
        const points = this.spacePartition(this.getRandomPoints());
        this.sortPoints(points);
        return points;
    }

    getRandomPoints() {
        const points = [];
        const pointSet = {};
        for (let i = 0; i < this.numOfPoints; ) {
            const x = this.getRandomNum(this.minCoordVal, this.maxCoordVal, this.isIntCoord);
            const y = this.getRandomNum(this.minCoordVal, this.maxCoordVal, this.isIntCoord);
            const key = x + '-' + y;
            if (!pointSet[key]) {
                pointSet[key] = true;
                points.push(new Vector2(x, y));
                i++;
            }
        }
        return points;
    }

    getRandomNum(min, max, isInt) {
        if (!isInt) {
            return Math.random() * (max - min) + min;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    spacePartition(points) {
        const firstPoint = points[0];
        const secondIndex = this.getRandomNum(1, this.numOfPoints - 1, true);
        const secondPoint = points[secondIndex];
        this.swapPoints(points, 1, secondIndex);

        let i = 2;
        let j = this.numOfPoints - 1;
        while (i <= j) {
            while (i < this.numOfPoints && this.isToLeftOrOnLine(firstPoint, secondPoint, points[i])) {
                i++;
            }
            while (j > 1 && !this.isToLeftOrOnLine(firstPoint, secondPoint, points[j])) {
                j--;
            }
            if (i <= j) {
                this.swapPoints(points, i, j);
                i++;
                j--;
            }
        }
        this.swapPoints(points, 1, j);
        this.spacePartitionRec(points, 0, j);
        return points;
    }

    spacePartitionRec(points, l, r) {
        if (r > l + 1) {
            const rp = this.getRandomNum(l + 1, r - l - 1, true);
            const firstPoint = points[l];
            const secondPoint = r === this.numOfPoints ? points[0] : points[r];
            const randomStartPoint = this.getRandomPointOnSegment(firstPoint, secondPoint);
            const randomEndPoint = points[rp];
            this.swapPoints(points, l + 1, rp);

            let i = l + 2;
            let j = r - 1;
            const isToLeft = this.isToLeftOrOnLine(randomStartPoint, randomEndPoint, points[l]);

            while (i <= j) {
                while (i < r && this.isToLeftOrOnLine(randomStartPoint, randomEndPoint, points[i]) === isToLeft) {
                    i++;
                }
                while (j > l + 1 && this.isToLeftOrOnLine(randomStartPoint, randomEndPoint, points[j]) !== isToLeft) {
                    j--;
                }
                if (i <= j) {
                    this.swapPoints(points, i, j);
                    i++;
                    j--;
                }
            }
            this.swapPoints(points, l + 1, j);
            this.spacePartitionRec(points, l, j);
            this.spacePartitionRec(points, j, r);
        }
    }

    swapPoints(points, i, j) {
        const tmp = points[i];
        points[i] = points[j];
        points[j] = tmp;
    }

    isToLeftOrOnLine(start, end, point) {
        return this.isLeft(start, end, point) <= 0;
    }

    isLeft(start, end, point) {
        return (end.x - start.x) * (point.y - start.y) - (end.y - start.y) * (point.x - start.x);
    }

    getRandomPointOnSegment(start, end) {
        const randomRatio = Math.random();
        return new Vector2(
            start.x + (end.x - start.x) * randomRatio,
            start.y + (end.y - start.y) * randomRatio
        );
    }

    sortPoints(points) {
        const p0: any = {};
        p0.y = Math.min.apply(null, points.map(p => p.y));
        p0.x = Math.max.apply(null, points.filter( p=> p.y === p0.y).map(p => p.x));
        points.sort((a,b) => {
            const isLeft = this.isLeft(a, b, p0);
            if (isLeft === 0) {
                return distCompare(a, b, p0);
            };
            return isLeft;
        });

        function distCompare(a, b, p0) {
            const distA = (p0.x - a.x) * (p0.x - a.x) + (p0.y - a.y) * (p0.y - a.y);
            const distB = (p0.x - b.x) * (p0.x - b.x) + (p0.y - b.y) * (p0.y - b.y);
            return distA - distB;
        }
    }
}


function GetPointRotated(v: Vector2, radians: number, pivot: Vector2){
// Xos, Yos // the coordinates of your center point of rect
// R      // the angle you wish to rotate

    const newX = pivot.x + (v.x-pivot.x) * Math.cos(radians) - (v.y-pivot.y) * Math.sin(radians);

    const newY = pivot.y + (v.x-pivot.x) * Math.sin(radians) + (v.y-pivot.y) * Math.cos(radians);

    return new Vector2(newX, newY)
}


class ScreenInterface {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor() {
        this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
    }

    renderLine(vectorStart: Vector2, vectorEnd: Vector2) {
        this.ctx.beginPath();
        this.ctx.moveTo(vectorStart.x, vectorStart.y);
        this.ctx.lineTo(vectorEnd.x, vectorEnd.y);
        this.ctx.stroke();
        this.ctx.restore();
    }

    clear() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class ElementsContext {
    elements: any[];

    constructor() {
        this.elements = []
    }
    
    addElement(element) {
        this.elements.push(element)
    }
}

class World extends ElementsContext {
    constructor() {
        super()
    }
}

class Vector2 {
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
        return a**2 + b**2 >= c**2 && a**2 + c**2 >= b**2
    }

    distance(vector: Vector2) {
        return Math.sqrt((this.x - vector.x)**2 + (this.y - vector.y)**2)
    }
}

class Element2dSurface {
    vectors: Mesh2d[];
    constructor(vectors: Mesh2d[]) {
        this.vectors = vectors
    }

}

class Mesh2d  {
    start: Vector2;
    end: Vector2;
    constructor(start: Vector2, end: Vector2) {
        this.start = start
        this.end = end
    }

}

function PentagonSurface() {
    return new Element2dSurface([
        new Mesh2d(new Vector2(0, -50), new Vector2(-48, -15)),
        new Mesh2d(new Vector2(-48, -15), new Vector2(-29, 40)),
        new Mesh2d(new Vector2(-29, 40), new Vector2(29, 40)),
        new Mesh2d(new Vector2(29, 40), new Vector2(48, -15)),
        new Mesh2d(new Vector2(48, -15), new Vector2(0, -50)),
    ]);
}

function RandomSurface() {
    const generator = new RIP({
        numOfPoints: 30, // number of points
        minCoordVal: 20, // minimum coordinate value
        maxCoordVal: 100, // maximum coordinate value
    });
    const coords = generator.getPolygonCoord();

    const vertices = []

    for (let i = 1; i < coords.length; i++) {
        vertices.push(new Mesh2d(coords[i -1], coords[i]))
    }

    vertices.push(new Mesh2d(coords[coords.length -1], coords[0]))

    return new Element2dSurface(
        vertices
    )

}

function SquareSurface() {
    return new Element2dSurface([
        new Mesh2d( new Vector2(0, 0), new Vector2(40, 0) ),
        new Mesh2d( new Vector2(40, 0), new Vector2(40, 40) ),
        new Mesh2d( new Vector2(40, 40), new Vector2(0, 40) ),
        new Mesh2d( new Vector2(0, 0), new Vector2(0, 40) ),
    ]);
}



class Player2d {

    private camera: RayTracingRenderer2d;
    private position: Vector2;
    private context: ElementsContext;
    private rotation: number;
    surface: Element2dSurface;
    private pivot: Vector2;



    constructor(position: Vector2) {
        this.position = position
        this.rotation = 0

        this.pivot = new Vector2(50, 50)
        this.surface = RandomSurface()
    }

    attachCamera(camera: RayTracingRenderer2d) {
        this.camera = camera
    }

    setContext(world: World) {
        this.context = world
    }

    everyTick() {

        console.log(this.rotation)


        this.rotation += 0.03




    }

    getMeshes() {
        const meshes = []

        for( const mesh of this.surface.vectors ) {
            const mesh2d: Mesh2d = <Mesh2d>mesh;

            const startRotated = GetPointRotated( mesh2d.start, this.rotation, this.pivot)
            const endRotated = GetPointRotated( mesh2d.end, this.rotation, this.pivot)

            meshes.push(new Mesh2d(startRotated.addVector(this.position), endRotated.addVector(this.position)))
        }


        return meshes
    }
}

class RayTracingRenderer2d {
    private context: ElementsContext;
    private isPaused: any;
    screenInterface: ScreenInterface;
    position: Vector2;
    visibleMeshes: Mesh2d[]

    constructor() {
        this.screenInterface = new ScreenInterface()
        this.position = new Vector2( 100, 300 )
        this.visibleMeshes = []


    }

    start() {
        this.renderQueue()

        setInterval(() => {

            for( const element of this.context.elements ){
                if( element.everyTick ) {
                    element.everyTick()
                }
            }

            this.updateVisibleMeshes()



        }, 30)
    }
    
    setContext(context: ElementsContext) {
        this.context = context
    }

    // MEshes is vectors
    updateVisibleMeshes() {
        for( const element of this.context.elements ) {

            const meshes = element.getMeshes()

            const visibleMeshes = []

            for( const mesh of meshes ) {

                if(  element.position.sum(element.pivot).isPointBetween(mesh.start, this.position) || element.position.sum(element.pivot).isPointBetween(mesh.end, this.position) ) {
                    visibleMeshes.push(mesh)
                }

            }

            this.visibleMeshes.push( ...visibleMeshes )
            this.visibleMeshes.push( new Mesh2d( element.position.sum(element.pivot), element.position.sum(element.pivot).sum(new Vector2(1,1)) ) )
        }
    }

    renderVisibleMeshes() {
        this.screenInterface.clear();

        let mesh2d;

        while( mesh2d = this.visibleMeshes.pop()) {
            this.screenInterface.renderLine(mesh2d.start, mesh2d.end)
        }

        this.screenInterface.renderLine(this.position, this.position.sum(new Vector2(30,30)))
    }

    renderQueue() {
        // TODO: render only the visible meshes


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

class MouseController {
    position: Vector2;
    private canvas: HTMLElement;
    constructor() {
        this.position = new Vector2(0,0)
        this.canvas = document.getElementById("myCanvas");
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.position.x = e.clientX - rect.left
            this.position.y = e.clientY - rect.top
        }, false);
    }

}

const world = new World()

const camera = new RayTracingRenderer2d()
camera.setContext( world )

const mouse = new MouseController()
camera.position = mouse.position

const player = new Player2d(new Vector2(200,200))
player.setContext( world )
player.attachCamera( camera )

world.addElement( player )

camera.start()
// ambient
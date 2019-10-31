exports.FieldOfView = class {

    constructor(element) {
        this.element = element
        this.distance = 100
        this.angle = 200

        if( !this.element.movement ) {
            throw new Error("The component FieldOfView dependsof movement component")
        }
    }

    has(element) {

        const distanceToElement = this.element.getDistanceToElement(element)
        if( distanceToElement > this.distance ) {
            return 
        }

        const angleIsBetween = ( angle, a, b ) => {
            angle = (360 + ( angle % 360)) % 360
            a = ( 3600 + a ) % 360;
            b = ( 3600 + b ) % 360;

            if( a < b ) {
                return a <= angle && angle <=b
            }

            return a <= angle || angle <=b
        }

        const angleToElement = this.element.getAngleTo(element.position)
        const range = this.angle / 2;
        const startRange = (this.element.movement.degrees - range) 
        const endRange = (this.element.movement.degrees + range) 

        return angleIsBetween(angleToElement, startRange, endRange)
    }

    debug(canvasCtx) {

        const center = this.element.getCenterPosition();
        const ray = this.distance;

        const range = this.angle / 2;
        
        this.element.drawLineInside(canvasCtx, this.element.movement.degrees - range, this.distance)
        this.element.drawLineInside(canvasCtx, this.element.movement.degrees + range, this.distance)
        
        const getArc = ( degree ) => ((this.element.movement.degrees + degree) / 360) * (Math.PI * 2)
        
        canvasCtx.beginPath();
        canvasCtx.arc(center.x, center.y, ray, getArc(-range), getArc(+range));
        canvasCtx.moveTo(center.x, center.y);
        canvasCtx.stroke();
    }

}
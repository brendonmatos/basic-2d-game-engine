exports.FieldOfView = class {

    constructor(element) {
        this.element = element

    }

    has(element) {

        const distanceToElement = this.element.getDistanceToElement(element)
        if( distanceToElement > this.element.viewDistance ) {
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
        const range = this.element.viewAngleRange / 2;
        const startRange = (this.element.movement.degrees - range) 
        const endRange = (this.element.movement.degrees + range) 

        return angleIsBetween(angleToElement, startRange, endRange)
    }

    debug(canvasCtx) {

        const center = this.element.getCenterPosition();
        const ray = this.element.viewDistance;

        const range = this.element.viewAngleRange / 2;
        
        this.element.drawLineInside(canvasCtx, this.element.movement.degrees - range, this.element.viewDistance)
        this.element.drawLineInside(canvasCtx, this.element.movement.degrees + range, this.element.viewDistance)
        
        const getArc = ( degree ) => ((this.element.movement.degrees + degree) / 360) * (Math.PI * 2)
        
        canvasCtx.beginPath();
        canvasCtx.arc(center.x, center.y, ray, getArc(-range), getArc(+range));
        canvasCtx.moveTo(center.x, center.y);
        canvasCtx.stroke();
    }

}
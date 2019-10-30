exports.FOVTagsNotifier = class {

    constructor(element) {
        this.element = element
    }
    
    update() {

        const elements = this.element.getContext().elements

        for (const element of elements) {

            if (element === this ) {
                continue
            }
            
            if ( this.element.fov.has(element) ) {
                this.element.messages.emit('see', element);
            } else {
                this.element.messages.emit('outofview', element)
            }
        }
    }
}
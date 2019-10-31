exports.FOVTagsNotifier = class  {

    constructor(element, fov, tags = []) {
        this.element = element
        this.fov = fov
        this.tags = tags
        this.elements = []
        this.inView = []
        this.listeners = {}
    }
    
    start() {
        this.elements = this.element.getContext().getElements()

        this.element.on('second', () => {
            this.update()
        })
    }

    update() {

        for (const element of this.elements) {

            if (element === this ) {
                continue
            }

            if ( this.fov.has(element) ) {
                element.tags.list.map( tag => {
                    this.element.emit(tag + '-enter', element)
                } )
            } else {
                element.tags.list.map( tag => {
                    this.element.emit(tag + '-out', element)
                } )
            }
        }
    }
}
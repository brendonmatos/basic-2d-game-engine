exports.Tag = class {

    constructor(name) {
        this.name = name
    }

}

exports.Tags = class {

    

    constructor( element ) {
        this.list = []
    }

    has(tag) {
        return this.list.indexOf(tag) >= 0
    }

    add(tag) {
        this.list.push(tag)
    }

}
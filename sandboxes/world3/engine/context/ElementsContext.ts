import {_Element} from "../Element";

export class ElementsContext {
    elements: _Element[];

    constructor() {
        this.elements = []
    }

    addElement(element) {
        this.elements.push(element)
    }
}
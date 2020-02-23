import {_Element} from "./Element";

export class _Component {
    private element: _Element;


    constructor() {
    }

    setElement(element: _Element) {
        this.element = element;
    }

    getElement() {
        return this.element
    }
}
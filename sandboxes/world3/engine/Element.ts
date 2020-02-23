import { _Component } from './Component'

interface ComponentsInicialization { [key: string]: _Component; }

export class _Element {
    children: _Element[] = [];
    parent: _Element;
    components: ComponentsInicialization = {};

    constructor( components: ComponentsInicialization ) {
        for( const key in components ) {
            this.addComponent(key, components[key])
        }
    }

    addComponent(key, component: _Component) {
        this.components[key] = component;
        this.components[key].setElement(this);
    }

    getComponent<T>(key): T {
        const component: T = ( this.components[key] as unknown ) as T

        if( typeof component === 'undefined' ) {
            throw new Error(`Could not find component in object with keys, ${JSON.stringify(Object.keys(this.components))}, ${key}`)
        }

        return component
    }


    setChildren(children: _Element[]) {
        this.children = children
    }

    addChild(child: _Element) {
        this.children.push(child)
    }

    setParent(element: _Element) {
        this.parent = element

        element.addChild(this)
    }

    update() {
        // Does nothing
    }

    getChildren() {
        return this.children
    }
}
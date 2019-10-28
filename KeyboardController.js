const EventEmitter = require('events');
class KeyboardController {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.key = {};
        this.handlers = {};
        document.addEventListener('keydown', (e) => {
            const letra = e.key || e.which;
            // const letra = String.fromCharCode(char).toLowerCase();
            this.triggerHandlers(letra, 'press', true);
        }, false);
        document.addEventListener('keyup', (e) => {
            const letra = e.key || e.which;
            // const letra = String.fromCharCode(char).toLowerCase();
            this.triggerHandlers(letra, 'release', false);
        }, false);
    }
    triggerHandlers(key, action, isPressed) {
        key = key.toLowerCase();
        this.key[key] = isPressed;
        this.eventEmitter.emit(key, action, isPressed);
    }
    on(key, handler) {
        this.eventEmitter.on(key, handler);
    }
}

exports.KeyboardController = KeyboardController
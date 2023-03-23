import Vector2 from "./Vector2";

export default class Connections {
    static instance = null;
    #wires = null;
    #pins = null;
    
    constructor() {
        Connections.instance = this;
        this.#wires = [];
        this.#pins = [];
    }

    addWire(value) {
        this.#wires.push(value);
    }
    removeWire(id) {
        for (let i = 0; i < this.#wires.length; i++) {
            const obj = this.#wires[i];
            if (obj.id == id){
                this.#wires.splice(i, 1);
                return;
            }
        }
    }
    getWire(id) {
        for (let i = 0; i < this.#wires.length; i++) {
            const obj = this.#wires[i];
            if (obj.id == id) {
                return obj;
            }
        }
        return null;
    }
    countWires(){
        return this.#wires.length;
    }

    addPin(value) {
        this.#pins.push(value);
    }
    removePins(id) {
        for (let i = 0; i < this.#pins.length; i++) {
            const obj = this.#pins[i];
            if (obj.id == id){
                this.#pins.splice(i, 1);
                return;
            }
        }
    }
    getPin(id) {
        for (let i = 0; i < this.#pins.length; i++) {
            const obj = this.#pins[i];
            if (obj.id == id) {
                return obj;
            }
        }
        return null;
    }
    countPins(){
        return this.#pins.length;
    }

    toJSON(){
        var wires = [];
        for (let i = 0; i < this.#wires.length; i++) {
            wires.push(this.#wires[i].toJSON());
        }
        var pins = [];
        for (let i = 0; i < this.#pins.length; i++) {
            pins.push(this.#pins[i].toJSON());
        }
        return {"pins": pins, "wires": wires};
    }

    fromJSON(json){
        var data = JSON.parse(json);
        for (let i = 0; i < data.wires.length; i++) {
            var wire = new Wire([], -1);
            this.#wires.push(wire.fromJSON(data.wires[i]));
        }
        for (let i = 0; i < data.pins.length; i++) {
            var pin = new Pin(Vector2.zero(), 0);
            this.#pins.push(pin.fromJSON(data.pins[i]));
        }
    }
}
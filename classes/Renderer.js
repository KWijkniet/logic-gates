export default class Renderer {
    static instance = null;
    #objects = null;
    
    constructor() {
        Renderer.instance = this;
        this.#objects = [];
        
        window.events.subscribe('draw', () => {
            this.draw();
        });
    }

    draw(){
        var keys = Object.keys(this.#objects);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            var obj = this.#objects[key];

            obj.draw();
        }
    }

    add(value) {
        this.#objects.push(value);
    }

    remove(id) {
        for (let i = 0; i < this.#objects.length; i++) {
            const obj = this.#objects[i];
            if (obj.id == id){
                this.#objects.splice(i, 1);
                return;
            }
        }
    }

    getAll() {
        return this.#objects;
    }

    get(id) {
        for (let i = 0; i < this.#objects.length; i++) {
            const obj = this.#objects[i];
            if (obj.id == id) {
                return obj;
            }
        }
        return null;
    }
}
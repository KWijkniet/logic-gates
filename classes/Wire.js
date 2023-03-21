import Vector2 from "./Vector2";

export default class Wire {
    dots = [];
    voltage = 0;
    voltageIndex = -1;

    // #delayMax = 10;
    // #delay = 0;

    constructor(dots){
        this.dots = dots.reverse();

        window.events.subscribe('draw', () => {
            this.draw();
            // this.#delay++;
            // if(this.#delay >= this.#delayMax){
            //     this.#delay = 0;
            //     this.drawDelayed();
            // }
        });
    }
    
    draw(){
        push();
        strokeWeight(10);
        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];
            const dotPrev = this.dots[i - 1 >= 0 ? i - 1 : 0];
            
            if(this.dots.length - i < this.voltageIndex){
                stroke(255, 0, 0);
            }
            else{
                stroke(0);
            }
            line(dotPrev.x, dotPrev.y, dot.x, dot.y);
        }
        pop();

        if(this.voltage >= 5){
            if(this.voltageIndex < this.dots.length){
                this.voltageIndex++;
            }
        }
        else{
            this.voltageIndex = -1;
            this.voltage += 5;
        }
    }

    // drawDelayed(){
        
    // }
}
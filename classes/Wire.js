import Vector2 from "./Vector2";

export default class Wire {
    posA = new Vector2(0, 0);
    posB = new Vector2(0, 0);
    voltage = 0;

    constructor(x1, y1, x2, y2){
        this.posA = new Vector2(x1, y1);
        this.posB = new Vector2(x2, y2);

        window.events.subscribe('draw', () => {this.draw();});
    }
    
    draw(){
        push();
        
        // console.log(this.posA);
        strokeWeight(5);
        stroke(0);
        line(this.posA.x, this.posA.y, this.posB.x, this.posB.y);

        if(this.voltage >= 5){
            strokeWeight(8);
            stroke(255, 0, 0);
            line(this.posA.x, this.posA.y, this.posB.x, this.posB.y);
        }

        pop();
        this.voltage += 0.0001;
    }
}
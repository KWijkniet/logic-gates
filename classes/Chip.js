import Pin from "./Pin";
import Settings from "./Settings";

export default class Chip {
    id = "";
    pinsIn = [];
    pinsOut = [];

    constructor(){
        this.id = Settings.getID();
    }
    
    draw(){

        for (let i = 0; i < this.pinsIn.length; i++) {
            this.pinsIn[i].draw();
        }
        for (let i = 0; i < this.pinsOut.length; i++) {
            this.pinsOut[i].draw();
        }
    }

    toJSON(){
        return {"id": this.id};
    }

    fromJSON(json){
        var data = JSON.parse(json);
        this.id = data.id;
    }
}
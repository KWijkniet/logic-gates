import Pin from "./Pin";
import Settings from "./Settings";
import Color from "./Color";

export default class Chip {
    id = "";
    name = "";
    color = new Color(null, 0, 0, 0);
    inputPins = [];
    outputPins = [];
    subChips = [];
    connections = [];

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

    simulate(){
        
    }

    toJSON(){
        return {"id": this.id, "name": this.name, "color": this.color, "inputPins": this.inputPins, "outputPins": this.outputPins, "subChips": this.subChips, "connections": this.connections};
    }

    fromJSON(json){
        var data = JSON.parse(json);
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.inputPins = data.inputPins;
        this.outputPins = data.outputPins;
        this.subChips = data.subChips;
        this.connections = data.connections;
    }
}
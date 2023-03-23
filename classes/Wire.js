import Vector2 from "./Vector2";
import Settings from "./Settings";
import Connections from "./Connections";

export default class Wire {
    id = "";
    lines = [];
    voltage = 0;
    voltageIndex = -1;
    totalLength = 0;
    endPinId = null;

    constructor(lines, endPinId){
        this.id = Settings.getID();
        this.endPinId = endPinId;
        Connections.instance.addWire(this);
        this.totalLength = 0;
        for (let i = 0; i < lines.length; i++) {
            this.totalLength += lines[i].length;
            lines[i] = lines[i].reverse();
        }
        this.lines = lines.reverse();

        for (let i = this.lines.length - 1; i >= 0; i--) {
            if(i - 1 >= 0 && this.lines[i].length >= 3){
                const currline = this.lines[i];
                const nextline = this.lines[i - 1];
                var last = null;
                var first = null;
                
                //remove last 2
                for (let x = 0; x < 2; x++) {
                    var tmp = currline.shift();
                    if(last == null){
                        last = tmp;
                    }
                }
                
                //remove first 2
                for (let x = 0; x < 2; x++) {
                    var tmp = nextline.pop();
                    if(first == null){
                        first = tmp;
                    }
                }

                //add curved corner
                var curve = [];
                var steps = 6;
                for (let r = 0; r < steps; r++) {
                    let x = bezierPoint(currline[0].x, last.x, first.x, nextline[nextline.length - 1].x, r / steps);
                    let y = bezierPoint(currline[0].y, last.y, first.y, nextline[nextline.length - 1].y, r / steps);
                    curve.push(new Vector2(x, y));
                }
                curve = curve.reverse();

                this.lines.splice(i, 0, curve);
            }
        }
    }
    
    draw(){
        push();
        strokeWeight(10);
        var index = 0;
        for (let i = 0; i < this.lines.length; i++) {
            for (let r = 0; r < this.lines[i].length; r++) {
                const dot = this.lines[i][r];
                let dotPrev = null;
                if(r - 1 < 0) {
                    if(i > 0){
                        dotPrev = this.lines[i - 1][this.lines[i - 1].length - 1];
                    }else{
                        dotPrev = this.lines[i][0];
                    }
                }
                else{
                    dotPrev = this.lines[i][r - 1];
                }
                
                if(this.totalLength - index < this.voltageIndex){
                    stroke(255, 0, 0);
                }
                else{
                    stroke(0);
                }

                line(dotPrev.x, dotPrev.y, dot.x, dot.y);
                index++;
            }
        }
        pop();

        if(this.voltage > 0){
            var pin = Connections.instance.getPin(this.endPinId);
            if(pin != null){
                pin.voltage = this.voltage;
            }

            if(this.voltageIndex < this.totalLength){
                this.voltageIndex++;
            }
        }
        else{
            this.voltageIndex--;
        }
    }

    toJSON(){
        return {"id": this.id, "lines": this.lines, "voltage": this.voltage, "voltageIndex": this.voltageIndex, "totalLength": this.totalLength, "endPinId": this.endPinId};
    }

    fromJSON(json){
        var data = JSON.parse(json);
        this.id = data.id;
        this.lines = data.lines;
        this.voltage = data.voltage;
        this.voltageIndex = data.voltageIndex;
        this.totalLength = data.totalLength;
        this.endPinId = data.endPinId;
    }
}
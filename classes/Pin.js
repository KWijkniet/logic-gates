import Settings from "./Settings";
import Wire from "./Wire";
import Vector2 from "./Vector2";
import Cursor from "./Cursor";
import Connections from "./Connections";

export default class Chip {
    id = "";
    wireIds = [];
    pos = new Vector2(0, 0);
    voltage = 0;

    constructor(pos, voltage = 0){
        this.id = Settings.getID();
        this.pos = pos;
        this.voltage = voltage;
        Connections.instance.addPin(this);

        Cursor.get().events.subscribe('click', (e) => {
            if(window.drawWireTool.pinId == this.id){ return; }
            var cursor = Cursor.get();
            var cursorPos = cursor.local().remove(cursor.offset);
            cursorPos.x /= Settings.zoom;
            cursorPos.y /= Settings.zoom;

            if(Vector2.distance(this.pos, cursorPos) <= 20){
                if(window.drawWireTool.enabled()){
                    var pinId = window.drawWireTool.pinId;
                    var wire = window.drawWireTool.complete(this.id, this.pos);
                    
                    var targetPin = Connections.instance.getPin(pinId);
                    if(targetPin != null){
                        targetPin.wireIds.push(wire.id);
                    }

                    e.preventDefault();
                }
                else{
                    window.drawWireTool.start(this.id, this.pos);
                }
            }
        });
    }
    
    draw(){
        var cursor = Cursor.get();
        var cursorPos = cursor.local().remove(cursor.offset);
        cursorPos.x /= Settings.zoom;
        cursorPos.y /= Settings.zoom;
        var outline = Settings.outlineColor.rgb();
        var pin = Settings.pinColor.rgb();
        var highlight = Settings.pinHighlightColor.rgb();

        push();
        stroke(outline.r, outline.g, outline.b);
        if(this.voltage == 0){
            fill(pin.r, pin.g, pin.b);
            if(Vector2.distance(this.pos, cursorPos) <= 20){
                fill(highlight.r, highlight.g, highlight.b);
            }
        }
        else{
            fill(255, 0, 0);
        }
        circle(this.pos.x, this.pos.y, 20);
        pop();

        for (let i = 0; i < this.wireIds.length; i++) {
            const id = this.wireIds[i];
            var wire = Connections.instance.getWire(id);
            if(wire != null){
                wire.voltage = this.voltage;
            }
        }
    }

    toJSON(){
        return {"id": this.id, "voltage": this.voltage, "pos": this.pos, "wireIds": this.wireIds};
    }

    fromJSON(json){
        var data = JSON.parse(json);
        this.id = data.id;
        this.voltage = data.voltage;
        this.wireIds = data.wireIds;
        this.pos = data.pos;
    }
}
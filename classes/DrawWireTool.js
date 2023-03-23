import Cursor from "./Cursor";
import Wire from "./Wire";
import Renderer from "./Renderer";
import Settings from "./Settings";
import Vector2 from "./Vector2";
import Collision from "./Collision";

export default class DrawWireTool {
    pinId = null;
    detailsDistance = 15;
    isEnabled = false;
    startPoint = null;

    #isDrawing = false;
    #lines = [];
    #cursor = null;
    #originalStart = null;

    constructor() {
        this.#cursor = Cursor.get();
        window.events.subscribe('draw', () => { this.draw(); });

        this.#cursor.events.subscribe('lateClick', (e) => {
            if(this.#isDrawing){
                var pos = this.#cursor.local().remove(this.#cursor.offset);
                pos.x /= Settings.zoom;
                pos.y /= Settings.zoom;
                
                for (let i = 0; i < this.#lines.length; i++) {
                    const line = this.#lines[i];
                    for (let r = 0; r < line.length; r++) {
                        const point = line[r];
                        if(Collision.pointCircle(point.x, point.y, pos.x, pos.y, 20)){
                            if(i == this.#lines.length - 1){
                                this.#lines.pop();
                                
                                if(this.#lines.length > 0){
                                    //reset line drawing start point
                                    var tmp = this.#lines[this.#lines.length - 1];
                                    this.startPoint = tmp[tmp.length - 1].getCopy();
                                }
                                else{
                                    this.startPoint = this.#originalStart.getCopy();
                                }
                            }
                            return;
                        }
                    }
                }

                if(this.startPoint == null){
                    this.startPoint = pos.getCopy();
                }
                else{
                    this.#createDetails(pos);
                }
            }
        });
    }

    draw() {
        if(this.#isDrawing){
            push();
            for (let i = 0; i < this.#lines.length; i++) {
                const l = this.#lines[i];
                line(l[0].x, l[0].y, l[l.length - 1].x, l[l.length - 1].y);
            }

            var pos = this.#cursor.local().remove(this.#cursor.offset);
            pos.x /= Settings.zoom;
            pos.y /= Settings.zoom;
            if(this.#lines.length > 0){
                var lastLine = this.#lines[this.#lines.length - 1];
                var lastPoint = lastLine[lastLine.length - 1];
                line(lastPoint.x, lastPoint.y, pos.x, pos.y);
            }
            else{
                line(this.startPoint.x, this.startPoint.y, pos.x, pos.y);
            }
            pop();
        }
    }

    complete(pinId, pos = null){
        if(pos != null){
            this.#createDetails(pos);
        }
        var wire = new Wire(this.#lines, pinId);
        this.startPoint = null;
        this.pinId = null;
        this.#lines = [];
        this.#isDrawing = false;
        this.#originalStart = null;

        Renderer.instance.add(wire);
        return wire;
    }

    start(pinId, pos = null){
        if(pos == null){
            pos = this.#cursor.local().remove(this.#cursor.offset);
            pos.x /= Settings.zoom;
            pos.y /= Settings.zoom;
        }
        
        this.startPoint = pos.getCopy();
        this.pinId = pinId;
        this.#isDrawing = true;
        this.#originalStart = pos;
    }

    cancel(){
        this.#isDrawing = false;
        this.startPoint = null;
        this.#lines = [];
    }

    enabled(){
        return this.#isDrawing;
    }

    #createDetails(pos){
        var tempX = pos.x - this.startPoint.x;
        var tempY = pos.y - this.startPoint.y;
        var details = Math.floor(Vector2.distance(this.startPoint, pos) / this.detailsDistance);
        var target = this.startPoint.getCopy();

        let line = [target];
        for (let i = 0; i < details; i++) {
            target = target.getCopy();
            target.add(new Vector2(tempX / details, tempY / details));
            line.push(target);
        }
        this.#lines.push(line);
        this.startPoint = pos;
    }
}
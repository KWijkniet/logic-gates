import Cursor from "./Cursor";
import Wire from "./Wire";
import Settings from "./Settings";
import Vector2 from "./Vector2";

export default class DrawWireTool {
    detailsDistance = 15;
    isEnabled = false;
    startPoint = null;

    #isDrawing = false;
    #points = [];
    #cursor = null;

    constructor() {
        this.#cursor = Cursor.get();
        window.events.subscribe('draw', () => { this.draw(); });

        this.#cursor.events.subscribe('click', (e) => {
            if(e.detail.shiftKey){
                var pos = this.#cursor.local().remove(this.#cursor.offset);
                pos.x /= Settings.zoom;
                pos.y /= Settings.zoom;
                
                if(this.startPoint == null){
                    this.startPoint = pos.getCopy();
                }
                else{
                    var tempX = pos.x - this.startPoint.x;
                    var tempY = pos.y - this.startPoint.y;
                    var details = Math.floor(Vector2.distance(this.startPoint, pos) / this.detailsDistance);
                    var target = this.startPoint.getCopy();

                    for (let i = 0; i < details; i++) {
                        target = target.getCopy();
                        target.add(new Vector2(tempX / details, tempY / details));

                        this.#points.push(target);
                    }
                    this.startPoint = pos;
                }

            }
        });

        document.addEventListener('keyup', (event) => {
            if (this.startPoint != null && event.key == "Escape") {
                this.startPoint = null;
                new Wire(this.#points);
                this.#points = [];
            }
        });
    }

    draw() {
        push();
        if(this.startPoint != null){
            var pos = this.#cursor.local().remove(this.#cursor.offset);
            pos.x /= Settings.zoom;
            pos.y /= Settings.zoom;

            strokeWeight(10);
            line(this.startPoint.x, this.startPoint.y, pos.x, pos.y);
        }
        pop();

        push();
        for (let i = 0; i < this.#points.length; i++) {
            const point = this.#points[i];
            
            circle(point.x, point.y, 15);
        }
        pop();
    }
}
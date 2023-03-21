import './style.css';
import Settings from './classes/Settings';
import Collision from './classes/Collision';
import Action from './classes/Action';
import EventSystem from './classes/EventSystem';
import Color from './classes/Color';
import Vector2 from './classes/Vector2';
import Cursor from './classes/Cursor';
import Wire from './classes/Wire';
import DrawWireTool from './classes/DrawWireTool';

// Colors
var backgroundColor = new Color("--background");

window.events = new EventSystem(['draw', 'setup', 'resize']);

var cursor, drawWireTool;

function setup() {
    var canvas = createCanvas(visualViewport.width, visualViewport.height);
    Settings.setCanvas(canvas);
    
    frameRate(60);

    cursor = new Cursor();
    drawWireTool = new DrawWireTool();

    events.invoke('setup');
}

function draw() {
    background(backgroundColor.rgb().r, backgroundColor.rgb().g, backgroundColor.rgb().b);

    push();
    translate(cursor.offset.x, cursor.offset.y);
    scale(Settings.zoom);
    events.invoke('draw');
    cursor.update();
    pop();
    
    showFPS();
}

function windowResized() {
    resizeCanvas(visualViewport.width, visualViewport.height);

    events.invoke('resize');
}

let fr = 60;
function showFPS() {
    var offset = Cursor.get().offset;
    var width = Math.abs(offset.x) > 999 || Math.abs(offset.y) > 999 ? 70 : Math.abs(offset.x) > 99 || Math.abs(offset.y) > 99 ? 60 : 45;
    push();
    fr = 0.95 * fr + 0.05 * frameRate();
    fill(0);
    rect(0, 0, width, 50);
    fill(255, 255, 255);
    noStroke();
    text(str(floor(fr * 100) / 100), 5, 16);
    text(Settings.zoom.toFixed(2) + "%", 4, 30);
    text((-offset.x).toFixed(0) + ", " + (-offset.y).toFixed(0), 4, 44);
    pop();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
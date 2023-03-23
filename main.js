import './style.css';
import Renderer from './classes/Renderer';
import Settings from './classes/Settings';
import ActionMenu from './classes/ActionMenu';
import EventSystem from './classes/EventSystem';
import Color from './classes/Color';
import Cursor from './classes/Cursor';
import DrawWireTool from './classes/DrawWireTool';
import Pin from './classes/Pin';
import Vector2 from './classes/Vector2';
import Connections from './classes/Connections';

// Colors
var backgroundColor = new Color("--background");

window.events = new EventSystem(['draw', 'setup', 'resize']);
window.actionMenu = new ActionMenu();
window.drawWireTool = null;

var renderer, connections, cursor;

function setup() {
    var canvas = createCanvas(visualViewport.width, visualViewport.height - 55);
    Settings.setCanvas(canvas);
    
    frameRate(60);

    connections = new Connections();
    renderer = new Renderer();
    cursor = new Cursor();

    window.drawWireTool = new DrawWireTool();

    actionMenu.add("Draw Wire", "Click anywhere to draw a line. call this again to complete.", ()=>{if(drawWireTool.enabled()){ drawWireTool.complete(); }else{ drawWireTool.start(); }}, "fa-magnifying-glass", true);

    events.invoke('setup');

    var pin = new Pin(new Vector2(100, 100), 5);
    events.subscribe("draw", ()=>{pin.draw();});

    var pin2 = new Pin(new Vector2(200, 200));
    events.subscribe("draw", ()=>{pin2.draw();});
}

function draw() {
    smooth();
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
    fr = 0.95 * fr + 0.05 * frameRate();

    push();
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

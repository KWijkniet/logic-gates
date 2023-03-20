import './style.css';
import Collision from './classes/Collision';
import Action from './classes/Action';
import EventSystem from './classes/EventSystem';
import Color from './classes/Color';
import Vector2 from './classes/Vector2';
import Cursor from './classes/Cursor';
import Wire from './classes/Wire';

// Colors
var backgroundColor = new Color("--background");

window.events = new EventSystem(['draw', 'setup', 'resize']);
var wire = new Wire(10, 10, 500, 500);

function setup() {
    createCanvas(visualViewport.width, visualViewport.height);

    events.invoke('setup');
}

function draw() {
    background(backgroundColor.rgb().r, backgroundColor.rgb().g, backgroundColor.rgb().b);

    events.invoke('draw');
}

function windowResized() {
    resizeCanvas(visualViewport.width, visualViewport.height);

    events.invoke('resize');
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
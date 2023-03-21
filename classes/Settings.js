import Color from "./Color";

export default class Settings {
    static mapSizeX = 5000;
    static mapSizeY = 5000 / 16 * 9;
    static zoom = 1;
    static cursorSize = 10;

    static backgroundColor = new Color("--grid-background");

    static #canvas = null;
    static setCanvas = (c) => { this.#canvas = c; };
    static getCanvas = () => { return this.#canvas; };
}
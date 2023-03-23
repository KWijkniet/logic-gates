import Color from "./Color";

export default class Settings {
    static mapSizeX = 5000;
    static mapSizeY = 5000 / 16 * 9;
    static zoom = 1;
    static cursorSize = 10;

    static backgroundColor = new Color("--background");
    static chipColor = new Color("--chip");
    static pinColor = new Color("--pin");
    static pinHighlightColor = new Color("--pin-highlight");
    static outlineColor = new Color("--outline");

    static #canvas = null;
    static setCanvas = (c) => { this.#canvas = c; };
    static getCanvas = () => { return this.#canvas; };

    static getID = (length = 16) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}
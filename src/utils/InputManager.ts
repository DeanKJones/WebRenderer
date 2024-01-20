import { Vec2 } from "./math/Vec2";

export class InputManager {
    private keyState: { [key: string]: boolean } = {};
    private mousePosition: Vec2 = new Vec2(0, 0);
    private mouseDown: boolean = false;

    constructor() {
        window.addEventListener('keydown', (event) => {
            this.keyState[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keyState[event.key] = false;
        });

        window.addEventListener('mousemove', (event) => {
            this.mousePosition = new Vec2(event.clientX, event.clientY);
        });

        window.addEventListener('mousedown', (event) => {
            if (event.button === 2) { // Right mouse button
                this.mouseDown = true;
            }
        });

        // Doesn't work too well on trackpads
        window.addEventListener('mouseup', (event) => {
            if (event.button === 2) { // Right mouse button
                this.mouseDown = false;
            }
        });
    }

    isKeyPressed(key: string) {
        return this.keyState[key] || false;
    }

    getMousePosition(): Vec2 {
        return this.mousePosition;
    }

    getMouseDown(): boolean {
        return this.mouseDown;
    }
}
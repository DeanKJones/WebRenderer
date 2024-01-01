//import { Object } from './geometry/Object';
import { Camera } from './camera/Camera';

class Scene {
    private objects: Object[] = [];
    private camera: Camera;

    constructor(camera: Camera) {
        this.camera = camera;
    }

    public addObject(object: Object): void {
        this.objects.push(object);
    }

    public removeObject(object: Object): void {
        const index = this.objects.indexOf(object);
        if (index !== -1) {
            this.objects.splice(index, 1);
        }
    }

    // public update(deltaTime: number): void {
    //     // Update logic for the scene
    //     for (const object of this.objects) {
    //         object.update(deltaTime);
    //     }
    // }

    // Other methods...

    // Getters and setters
    public getObjects(): Object[] {
        return this.objects;
    }

    public getCamera(): Camera {
        return this.camera;
    }
}

export { Scene };

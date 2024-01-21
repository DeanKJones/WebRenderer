import { Mat4x4 } from "../../utils/math/Mat4x4";
import { UniformBuffer } from "../../render_pipelines/uniform_buffers/UniformBuffer";
import { Vec3 } from "../../utils/math/Vec3";
import { InputManager } from "../../utils/InputManager";
import { Vec2 } from "../../utils/math/Vec2";

export class Camera
{
    public buffer: UniformBuffer;

    private _target: Vec3 = new Vec3(0, 0, 0);
    
    private _position: Vec3 = new Vec3(0, 1, -8.5);
    private _forward: Vec3 = new Vec3(0, 0, 1);
    private _right: Vec3 = new Vec3(1, 0, 0);
    private _up: Vec3 = new Vec3(0, 1, 0);

    private _aspect: number;        // Aspect ratio
    private _near: number = 0.0001; // Near clipping plane
    private _far: number = 100;     // Far clipping plane
    private _fov: number = 45;      // Field of view (for perspective projection)

    private _isPerspective: boolean = true;
    private _orthoScale: number = 2;

    private _view: Mat4x4 = Mat4x4.identity();
    private _projectionView: Mat4x4 = Mat4x4.identity();

    private _inputManager: InputManager = new InputManager();
    private _speed: number = 0.1;
    private _rotationSpeed: number = 0.05;
    private _lastMousePos: Vec2 = new Vec2(0, 0);

    //---------------------------------------------

    constructor(device: GPUDevice, canvas: HTMLCanvasElement)
    {
        this.buffer = new UniformBuffer(device, this._projectionView, "Camera Buffer");
        this._aspect = (canvas.width / canvas.height);
        this.updateView();
    }

    public update() 
    {
        let moved: boolean = false;

        let mousePos: Vec2 = this._inputManager.getMousePosition();
        let delta = mousePos.subtract(this._lastMousePos).multiply(0.0002);
        this._lastMousePos = mousePos;

        // Mouse movement
        // This is the spacebar, wow scuffed
        if (!this._inputManager.isKeyPressed(' ')) // Spacebar
        {
            delta = new Vec2(0.0, 0.0);
        }

        if (this._inputManager.isKeyPressed('w')) {
            this._position.scaleAndAdd(this._speed, this._forward);
            moved = true;
        }
        if (this._inputManager.isKeyPressed('s')) {
            this._position.scaleAndSubtract(this._speed, this._forward);
            moved = true;
        }
        if (this._inputManager.isKeyPressed('a')) {
            this._position.scaleAndSubtract(this._speed, this._right);
            moved = true;
        }
        if (this._inputManager.isKeyPressed('d')) {
            this._position.scaleAndAdd(this._speed, this._right);
            moved = true;
        }
        if (this._inputManager.isKeyPressed('q')) {
            this._position.scaleAndSubtract(this._speed, this._up);
            moved = true;
        }
        if (this._inputManager.isKeyPressed('e')) {
            this._position.scaleAndAdd(this._speed, this._up);
            moved = true;
        }

        // Rotation current not working.
        // TODO NEED TO FIX THIS
        if (delta.x != 0.0 || delta.y != 0.0) 
        {
            let pitchDelta = this._rotationSpeed * delta.y;
            let yawDelta = this._rotationSpeed * delta.x;

            let pitchMatrix = Mat4x4.rotationAxis(this._right, pitchDelta);
            let yawMatrix = Mat4x4.rotationAxis(this._up, yawDelta);

            let rotation = Mat4x4.multiply(pitchMatrix, yawMatrix);

            this._forward = Mat4x4.multiplyVec3(rotation, this._forward);
            this._right = Vec3.cross(this._up, this._forward);

            moved = true;
        }


        if (moved)
            this.updateView();
            this.updateProjectionView();
    }

    //---------------------------------------------

    private updateView()
    {
        this._view = Mat4x4.view(this._position, 
                                 this._position.add(this._forward), 
                                 this._up);
        // Here we can add functionality to look at a target
    }

    private updateProjectionView() 
    {
        let projection: Mat4x4;

        if (this._isPerspective) {
            projection = Mat4x4.perspective(this._fov, this._aspect, this._near, this._far);
        } 
        else {
            projection = Mat4x4.orthographic(-(this._orthoScale), (this._orthoScale),
                                             -(this._orthoScale), (this._orthoScale),
                                               this._near, this._far);
        }
        this._projectionView = Mat4x4.multiply(projection, this._view);
        this.buffer.update(this._projectionView);
    }

    //---------------------------------------------
    //  Getters

    public get position(): Vec3 {
        return this._position;
    }

    public get target(): Vec3 {
        return this._target;
    }

    public get up(): Vec3 {
        return this._up;
    }

    //---------------------------------------------
    //  Setters

    public set position(value: Vec3) {
        this._position = value;
        this.updateProjectionView();
    }

    public set target(value: Vec3) {
        this._target = value;
        this.updateProjectionView();
    }

    public set up(value: Vec3) {
        this._up = value;
        this.updateProjectionView();
    }

    public set fov(value: number) {
        this._fov = value;
        this.updateProjectionView();
    }

    public set aspect(value: number) {
        this._aspect = value;
        this.updateProjectionView();
    }

    public set near(value: number) {
        this._near = value;
        this.updateProjectionView();
    }

    public set far(value: number) {
        this._far = value;
        this.updateProjectionView();
    }

    public set projectionView(value: Mat4x4) {
        this._projectionView = value;
        this.buffer.update(value);
    }

    public set isPerspective(value: boolean) {
        this._isPerspective = value;
        this.updateProjectionView();
    }

}
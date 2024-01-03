import { Mat4x4 } from "../../utils/math/Mat4x4";
import { UniformBuffer } from "../../render_pipelines/uniform_buffers/UniformBuffer";
import { Vec3 } from "../../utils/math/Vec3";

export class Camera
{
    public buffer: UniformBuffer;

    private _position: Vec3 = new Vec3(0, 0, -3);
    private _target: Vec3 = new Vec3(0, 0, 0);
    private _up: Vec3 = new Vec3(0, 1, 0);

    private _aspect: number;        // Aspect ratio
    private _near: number = 0.0001; // Near clipping plane
    private _far: number = 100;     // Far clipping plane
    private _fov: number = 45;      // Field of view (for perspective projection)

    private _isPerspective: boolean = true;
    private _orthoScale: number = 2;

    private _projectionView: Mat4x4 = Mat4x4.identity();

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

    //---------------------------------------------

    constructor(device: GPUDevice, canvas: HTMLCanvasElement)
    {
        this.buffer = new UniformBuffer(device, this._projectionView, "Camera Buffer");
        this._aspect = (canvas.width / canvas.height);
        this.updateProjectionView();
    }

    //---------------------------------------------

    private updateProjectionView() {
        let view = Mat4x4.view(this._position, this._target, this._up);
        let projection: Mat4x4;

        if (this._isPerspective) {
            projection = Mat4x4.perspective(this._fov, this._aspect, this._near, this._far);
        } 
        else {
            projection = Mat4x4.orthographic(-(this._orthoScale), (this._orthoScale),
                                             -(this._orthoScale), (this._orthoScale),
                                               this._near, this._far);
        }
        this._projectionView = Mat4x4.multiply(projection, view);
        this.buffer.update(this._projectionView);
    }
}
import { Texture2D } from "../../scene/texture/Texture2D";

export class GeometryBindGroup implements GPUBindGroup
{
    public __brand: "GPUBindGroup" = "GPUBindGroup";
    public label: string = "";

    public bindGroup: GPUBindGroup;

    private _modelMatrixBuffer: GPUBuffer;
    private _texture: Texture2D;
    private _colorBuffer: GPUBuffer;

    private _device: GPUDevice;
    private _bindGroupLayout: GPUBindGroupLayout;

    constructor(device: GPUDevice, 
                layout: GPUBindGroupLayout, 
                _modelMatrixBuffer: GPUBuffer, 
                texture: Texture2D,
                colorBuffer: GPUBuffer) 
    {
        this._device = device;
        this._bindGroupLayout = layout;

        this._modelMatrixBuffer = _modelMatrixBuffer;
        this._texture = texture;
        this._colorBuffer = colorBuffer;

        this.bindGroup = this.createBindGroup();
    }

    public createBindGroup() : GPUBindGroup {
        return this._device.createBindGroup({
            label: "Geometry Bind Group",
            layout: this._bindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this._modelMatrixBuffer
                    }
                },
                {
                    binding: 1,
                    resource: this._texture.texture.createView()
                },
                {
                    binding: 2,
                    resource: this._texture.sampler
                },
                {
                    binding: 3,
                    resource: {
                        buffer: this._colorBuffer
                    }
                },
            ]
        });
    }

    public updateModelMatrixBuffer(device: GPUDevice, matrix: Float32Array) {
        device.queue.writeBuffer(this._modelMatrixBuffer, 0, matrix.buffer);
    }

    public updateColorBuffer(device: GPUDevice, color: Float32Array) {
        device.queue.writeBuffer(this._colorBuffer, 0, color.buffer);
    }
}
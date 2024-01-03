export class ProjectionBindGroup implements GPUBindGroup
{
    public __brand: "GPUBindGroup" = "GPUBindGroup";
    public label: string = "";
    
    public bindGroup: GPUBindGroup;

    private _viewMatrixBuffer: GPUBuffer;
    private _cameraBuffer: GPUBuffer;

    private _device: GPUDevice;
    private _bindGroupLayout: GPUBindGroupLayout;

    constructor(device: GPUDevice, layout: GPUBindGroupLayout, _viewMatrixBuffer: GPUBuffer, _cameraBuffer: GPUBuffer) 
    {
        this._viewMatrixBuffer = _viewMatrixBuffer;
        this._cameraBuffer = _cameraBuffer;

        this._device = device;
        this._bindGroupLayout = layout;

        this.bindGroup = this.createBindGroup();
    }

    public createBindGroup() : GPUBindGroup {
        return this._device.createBindGroup({
            layout: this._bindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this._viewMatrixBuffer
                    }
                },
                {
                    binding: 1,
                    resource: {
                        buffer: this._cameraBuffer
                    }
                }
            ]
        });
    }

    public updateViewMatrixBuffer(matrix: Float32Array) {
        this._device.queue.writeBuffer(this._viewMatrixBuffer, 0, matrix.buffer);
    }

    public updateCameraBuffer(cameraData: Float32Array) {
        this._device.queue.writeBuffer(this._cameraBuffer, 0, cameraData.buffer);
    }
}
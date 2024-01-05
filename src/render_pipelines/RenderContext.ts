import { Camera } from "../scene/camera/Camera";
import { Texture2D } from "../scene/texture/Texture2D";

import { BindGroupManager } from "./BindGroupManager";

export class RenderContext {

    public device: GPUDevice;
    public camera: Camera;
    public canvas: HTMLCanvasElement;
    public texture: Texture2D;

    public bindGroupManager: BindGroupManager;

    public depthTexture: GPUTexture;

    constructor(
        device: GPUDevice,
        camera: Camera,
        canvas: HTMLCanvasElement,
        texture: Texture2D
    ) 
    {
        this.device = device;
        this.camera = camera;
        this.canvas = canvas;
        this.texture = texture;
        this.bindGroupManager = new BindGroupManager(device, camera, texture);

        this.depthTexture = device.createTexture({
            label: 'Depth Texture',
            size: { width: canvas.width, height: canvas.height, depthOrArrayLayers: 1 },
            format: 'depth24plus-stencil8',
            usage: GPUTextureUsage.RENDER_ATTACHMENT
        });
    }
}
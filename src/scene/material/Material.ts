import { ShaderProgram } from "../../render_pipelines/UnlitRenderPipeline/ShaderProgram";
import { Color } from "../../utils/math/Color";
import { Texture2D } from "../texture/Texture2D";
/*
export class Material 
{
    shaderProgram: ShaderProgram;
    sampler: GPUSampler;
    texture: Texture2D;
    device: GPUDevice;
    color: Color;
  
    constructor(shaderProgram: ShaderProgram, color: Color, texture: Texture2D, device: GPUDevice) 
    {
        this.shaderProgram = shaderProgram;
        this.sampler = texture.sampler;
        this.texture = texture;
        this.device = device;
        this.color = color;
    }

    public async initialize(image: HTMLImageElement) {
        this.createTextureAndSampler(image.width, image.height);

        const imageBitmap = await createImageBitmap(image);

        this.device.queue.copyExternalImageToTexture(
            { source: imageBitmap },
            { texture: this.texture as unknown as GPUTexture },
            { width: image.width, height: image.height }
        );
    }

    public async initializeFromData(data: ArrayBuffer, width: number, height: number) {
        this.createTextureAndSampler(width, height);

        this.device.queue.writeTexture(
            { texture: this.texture as unknown as GPUTexture },
            data,
            {},
            { width, height }
        );
    }

    private createTextureAndSampler(width: number, height: number) {
        this.texture = this.device.createTexture({
            size: { width, height },
            format: "rgba8unorm",
            usage: GPUTextureUsage.COPY_DST
                | GPUTextureUsage.TEXTURE_BINDING
                | GPUTextureUsage.RENDER_ATTACHMENT
        } as GPUTextureDescriptor);

        this.sampler = this.device.createSampler({
            magFilter: "linear",
            minFilter: "linear",
            addressModeU: "repeat",
            addressModeV: "repeat",
        });
    }
}
*/
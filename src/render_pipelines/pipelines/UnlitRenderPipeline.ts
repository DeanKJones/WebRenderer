import shaderSource from "../../shaders/UnlitMaterialShader.wgsl?raw"
import { RenderContext } from "../RenderContext";
import { VertexBuffer } from "../attribute_buffers/VertexBuffer";

export class UnlitRenderPipeline {

    private _renderPipeline: GPURenderPipeline;

    constructor(context: RenderContext) {

        const shaderModule = context.device.createShaderModule({
            code: shaderSource
        });

        const layout: GPUPipelineLayout = context.bindGroupManager.createPipelineLayout();
        const vertexBuffer = new VertexBuffer();
        const bufferLayout: Array<GPUVertexBufferLayout> = vertexBuffer.getBufferLayout();

        this._renderPipeline = context.device.createRenderPipeline({
            layout: layout,
            label: "Unlit Render Pipeline",
            primitive: {
                topology: 'triangle-list',
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus-stencil8',
            },
            vertex: {
                buffers: bufferLayout,
                module: shaderModule,
                entryPoint: "unlitMaterialVS"
            },
            fragment: {
                module: shaderModule,
                entryPoint: "unlitMaterialFS",
                targets: [{
                    format: "bgra8unorm"
                }]
            },
        });
    }

    //------------------------------------------
    // GETTERS

    public get pipeline(): GPURenderPipeline {
        return this._renderPipeline;
    }
}
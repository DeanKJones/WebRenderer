import gridShaderSource from "../../shaders/GridShader.wgsl?raw"
import { RenderContext } from "../RenderContext";
import { VertexBuffer } from "../attribute_buffers/VertexBuffer";

export class GridRenderPipeline {

    private _renderPipeline: GPURenderPipeline;

    constructor(context: RenderContext) {

        const shaderModule = context.device.createShaderModule({
            code: gridShaderSource
        });

        const layout: GPUPipelineLayout = context.bindGroupManager.createPipelineLayout();
        const vertexBuffer = new VertexBuffer();
        const bufferLayout: Array<GPUVertexBufferLayout> = vertexBuffer.getBufferLayout();

        this._renderPipeline = context.device.createRenderPipeline({
            layout: layout,
            label: "Grid Render Pipeline",
            primitive: {
                topology: 'line-list',
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus-stencil8',
            },
            vertex: {
                buffers: bufferLayout,
                module: shaderModule,
                entryPoint: "gridVS"
            },
            fragment: {
                module: shaderModule,
                entryPoint: "gridFS",
                targets: [{
                    format: "bgra8unorm"
                }]
            }
        });
    }

    public get renderPipeline(): GPURenderPipeline {
        return this._renderPipeline;
    }
}
import shaderSource from "../../shaders/UnlitMaterialShader.wgsl?raw"

import { GeometryBuffers } from "../attribute_buffers/GeometryBuffers";
import { RenderContext } from "../RenderContext";

export class UnlitRenderPipeline {

    private renderPipeline: GPURenderPipeline;

    constructor(context: RenderContext) {

        const shaderModule = context.device.createShaderModule({
            code: shaderSource
        });

        const bufferLayout: Array<GPUVertexBufferLayout> = [];

        bufferLayout.push({
            arrayStride: 3 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [
                {
                    shaderLocation: 0,
                    offset: 0,
                    format: "float32x3"
                }
            ],
        })

        bufferLayout.push({
            arrayStride: 4 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [
                {
                    shaderLocation: 1,
                    offset: 0,
                    format: "float32x4"
                }
            ],
        })

        bufferLayout.push({
            arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [
                {
                    shaderLocation: 2,
                    offset: 0,
                    format: "float32x2"
                }
            ],
        })


        const layout: GPUPipelineLayout = context.bindGroupManager.createPipelineLayout();

        this.renderPipeline = context.device.createRenderPipeline({
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

    public draw(renderPassEncoder: GPURenderPassEncoder, buffers: GeometryBuffers, context: RenderContext) {
        renderPassEncoder.setPipeline(this.renderPipeline);
        renderPassEncoder.setVertexBuffer(0, buffers.positionsBuffer);
        renderPassEncoder.setVertexBuffer(1, buffers.colorsBuffer);
        renderPassEncoder.setVertexBuffer(2, buffers.texCoordsBuffer);

        // passes geometry
        let geometryBindGroup = context.bindGroupManager.getBindGroupByName("geometry");
        renderPassEncoder.setBindGroup(0, geometryBindGroup);

        // passes projection view matrix
        let projectionViewBindGroup = context.bindGroupManager.getBindGroupByName("projectionView");
        renderPassEncoder.setBindGroup(1, projectionViewBindGroup);

        // draw with indexed buffer 
        if (buffers.indicesBuffer) {
            renderPassEncoder.setIndexBuffer(buffers.indicesBuffer, "uint16");
            renderPassEncoder.drawIndexed(buffers.indexCount!, 1, 0, 0, 0);
        }
        else {
            renderPassEncoder.draw(buffers.vertexCount, 1, 0, 0);
        }
    }

}
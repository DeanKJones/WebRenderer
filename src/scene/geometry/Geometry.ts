
import { Mat4x4 } from "../../utils/math/Mat4x4";
import { Texture2D } from "../texture/Texture2D";

import { GeometryData } from "./GeometryData";
import { GeometryBuffers } from "../../render_pipelines/attribute_buffers/GeometryBuffers";
import { RenderContext } from "../../render_pipelines/RenderContext";

export class Geometry 
{
    //private _geometryName: string = "Base Geometry";

    private _modelMatrix: Mat4x4;
    private _texture: Texture2D;

    private _geometryData: GeometryData;
    private _gBuffer: GeometryBuffers;

    constructor( pContext: RenderContext,
                 initData: () => GeometryData )  // Function that returns GeometryData
    {
        this._modelMatrix = Mat4x4.identity();
        this._texture = pContext.texture;

        this._geometryData = initData();
        this._gBuffer = new GeometryBuffers(pContext.device, this);
    }

    //---------------------------------
    // DRAW
    
    public draw(renderPassEncoder: GPURenderPassEncoder, context: RenderContext, pipeline: GPURenderPipeline) 
    {
        // Set Pipeline
        renderPassEncoder.setPipeline(pipeline);

        renderPassEncoder.setVertexBuffer(0, this._gBuffer.positionsBuffer);
        renderPassEncoder.setVertexBuffer(1, this._gBuffer.colorsBuffer);
        renderPassEncoder.setVertexBuffer(2, this._gBuffer.texCoordsBuffer);

        let geometryBindGroup = context.bindGroupManager.getBindGroupByName("geometry");
        renderPassEncoder.setBindGroup(0, geometryBindGroup);

        let projectionViewBindGroup = context.bindGroupManager.getBindGroupByName("projectionView");
        renderPassEncoder.setBindGroup(1, projectionViewBindGroup);

        if (this._gBuffer.indicesBuffer) {
            renderPassEncoder.setIndexBuffer(this._gBuffer.indicesBuffer, "uint16");
            renderPassEncoder.drawIndexed(this._gBuffer.indexCount!, 1, 0, 0, 0);
        }
        else {
            renderPassEncoder.draw(this._gBuffer.vertexCount, 1, 0, 0);
        }
    }

    //---------------------------------
    // SETTERS

    public set transform(modelMatrix: Mat4x4)
    {
        this._modelMatrix = modelMatrix;
    }

    //---------------------------------
    // GETTERS

    public get transform(): Mat4x4
    {
        return this._modelMatrix;
    }

    public get texture(): Texture2D
    {
        return this._texture;
    }

    public get modelMatrix(): Float32Array
    {
        return this._modelMatrix;
    }

    public get geometryData(): GeometryData
    {
        return this._geometryData;
    }
}
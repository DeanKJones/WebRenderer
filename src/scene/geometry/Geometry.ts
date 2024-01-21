
import { Mat4x4 } from "../../utils/math/Mat4x4";
import { Texture2D } from "../texture/Texture2D";

import { GeometryBuffers } from "../../render_pipelines/attribute_buffers/GeometryBuffers";
import { RenderContext } from "../../render_pipelines/RenderContext";

import { GeometryData } from "./GeometryData";
import { Cube } from "./primitives/Cube";
import { Grid } from "./editor/Grid";
import { MeshOBJ } from "./import/ImportOBJ";

export class Geometry 
{
    private _modelMatrix: Mat4x4;
    private _texture: Texture2D;
    private _gBuffer: GeometryBuffers;

    private _cubeData?: GeometryData;
    private _gridData?: GeometryData;

    private _context: RenderContext;
    private _fileString: string;

    constructor(context: RenderContext, fileString: string = "")
    {
        this._context = context;
        this._fileString = fileString;

        this._modelMatrix = Mat4x4.identity();
        this._texture = context.texture;
        this._gBuffer = new GeometryBuffers(context.device, this);

        context.bindGroupManager.createGeometryBindGroup(this);
    }

    //---------------------------------
    // DRAW
    
    public draw(renderPassEncoder: GPURenderPassEncoder, pipeline: GPURenderPipeline) 
    {
        // Set Pipeline
        renderPassEncoder.setPipeline(pipeline);

        renderPassEncoder.setVertexBuffer(0, this._gBuffer.positionsBuffer);
        renderPassEncoder.setVertexBuffer(1, this._gBuffer.colorsBuffer);
        renderPassEncoder.setVertexBuffer(2, this._gBuffer.texCoordsBuffer);

        let geometryBindGroup = this._context.bindGroupManager.getGeometryBindGroup(this);
        renderPassEncoder.setBindGroup(0, geometryBindGroup);

        let projectionViewBindGroup = this._context.bindGroupManager.getBindGroupByName("projectionView");
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
    // BIND GROUPS

    public updateGeometryBindGroup()
    {
        this._context.bindGroupManager.updateGeometryBindGroup(this);
    }

    //---------------------------------
    // GEOMETRY
    //     init

    public initCubeData(): GeometryData
    {
        let cube = new Cube();
        return cube.data;
    }

    public initGridData(): GeometryData
    {
        let grid = new Grid();
        return grid.data;
    }

    public initOBJData(): GeometryData
    {
        if (this._fileString.length == 0) {
            throw new Error("File string is empty");
        }
        let obj = new MeshOBJ(this._fileString);
        return obj.data;
    }

    //---------------------------------
    // GEOMETRY
    //   create

    public createCubeData(): GeometryData
    {
        if (!this._cubeData) {
            this._cubeData = this.initCubeData();
        }
        return this._cubeData;
    }

    public createGridData(): GeometryData
    {
        if (!this._gridData) {
            this._gridData = this.initGridData();
        }
        return this._gridData;
    }


    //---------------------------------
    // SETTERS

    public set transform(modelMatrix: Mat4x4)
    {
        this._modelMatrix = modelMatrix;
    }

    public set fileString(fileString: string)
    {
        this._fileString = fileString;
    } 

    //---------------------------------
    // GETTERS

    public get gBuffer(): GeometryBuffers 
    {
        if (!this._gBuffer) {
            this._gBuffer = new GeometryBuffers(this._context.device, this);
        }
        return this._gBuffer;
    }

    public get transform(): Mat4x4
    {
        return this._modelMatrix;
    }

    public get fileString(): string
    {
        return this._fileString;
    }

    public get texture(): Texture2D
    {
        return this._texture;
    }

    public get modelMatrix(): Float32Array
    {
        return this._modelMatrix;
    }
}
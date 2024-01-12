
import { Mat4x4 } from "../../utils/math/Mat4x4";
import { Texture2D } from "../texture/Texture2D";

export class Geometry 
{
    //private _geometryName: string = "Base Geometry";

    private _modelMatrix: Mat4x4;
    private _texture: Texture2D;

    private _geometryData: GeometryData;
    private _gBuffer: GeometryBuffers;

    constructor( pDevice: GPUDevice,
                 pGeometryData: GeometryData,
                 pTexture: Texture2D )
    {
        this._modelMatrix = Mat4x4.identity();
        this._texture = pTexture;

        this._geometryData = pGeometryData;
        this._gBuffer = new GeometryBuffers(pDevice, this);
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
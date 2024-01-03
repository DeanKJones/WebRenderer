
import { Mat4x4 } from "../../utils/math/Mat4x4";
import { Texture2D } from "../texture/Texture2D";

export class Geometry 
{
    //private _geometryName: string = "Base Geometry";

    private _modelMatrix: Mat4x4;
    private _texture: Texture2D;

    positions: Float32Array;
    indices: Uint16Array;
    colors: Float32Array;
    texCoords: Float32Array;

    constructor( pPositions: Float32Array,
                 pIndices: Uint16Array,
                 pColors: Float32Array,
                 pTexCoords: Float32Array,
                 pTexture: Texture2D )
    {
        this._modelMatrix = Mat4x4.identity();
        this._texture = pTexture;

        this.positions = pPositions;
        this.indices = pIndices;
        this.colors = pColors;
        this.texCoords = pTexCoords;
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
}
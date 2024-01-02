import { Mat4x4 } from "../../utils/math/Mat4x4";

export class Geometry 
{
    geometryType: string = "Base Geometry";
    geometryName: string = "Base Geometry";
    geometryID: number = 0;
    geometryIndex: number = 0;
    geometrySize: number = 0;
    geometryVertices: number = 0;
    geometryFaces: number = 0;
    geometryEdges: number = 0;

    modelMatrix: Mat4x4;
    positions: Float32Array;
    indices: Uint16Array;
    colors: Float32Array;
    texCoords: Float32Array;

    constructor(
        pPositions: Float32Array,
        pIndices: Uint16Array,
        pColors: Float32Array,
        pTexCoords: Float32Array
    )
    {
        this.modelMatrix = Mat4x4.identity();

        this.positions = pPositions;
        this.indices = pIndices;
        this.colors = pColors;
        this.texCoords = pTexCoords;
    }

    public update(deltaTime: number): void
    {
        // Update logic for the object
    }

    public set transform(modelMatrix: Mat4x4)
    {
        this.modelMatrix = modelMatrix;
    }
}
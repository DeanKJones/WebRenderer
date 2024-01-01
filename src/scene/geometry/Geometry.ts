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

    constructor(
        public positions: Float32Array,
        public indices: Uint16Array = new Uint16Array(),
        public colors: Float32Array = new Float32Array(),
        public texCoords: Float32Array = new Float32Array()
    )
    {}
}
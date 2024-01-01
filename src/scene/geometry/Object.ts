import { Mat4x4 } from "../../utils/math/Mat4x4";
// import { Material } from "../material/Material";
import { Geometry } from "./Geometry";

import { ShaderProgram } from "../../render_pipelines/UnlitRenderPipeline/ShaderProgram"; // Add this import statement
/*
export class Object
{
    geometryType: string = "Object";
    geometryName: string = "Object";
    geometryID: number = 0;
    geometryIndex: number = 0;
    geometrySize: number = 0;
    geometryVertices: number = 0;
    geometryFaces: number = 0;
    geometryEdges: number = 0;

    geometry: Geometry;
    material: Material;
    transform: Mat4x4;

    constructor(
        public positions: Float32Array,
        public indices: Uint16Array = new Uint16Array(),
        public colors: Float32Array = new Float32Array(),
        public texCoords: Float32Array = new Float32Array()
    )
    {
        this.geometry = new Geometry(positions, indices, colors, texCoords);
        this.material = new Material(shaderProgram, color, texture, device);
        this.transform = new Mat4x4();
    }

    public update(deltaTime: number): void
    {
        // Update logic for the object
    }


}
*/
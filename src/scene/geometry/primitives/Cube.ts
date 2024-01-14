import { RenderContext } from "../../../render_pipelines/RenderContext";
import { Geometry } from "../Geometry";
import { GeometryData } from "../GeometryData";


export class Cube extends Geometry 
{
    constructor(context: RenderContext) 
    {
        super(context, () => this.initData());
    }

    private initData(): GeometryData {
        let vertices = new Float32Array([
            // front
            -0.5, -0.5, 0.5, // bottom left
            -0.5, 0.5, 0.5, // top left
            0.5, -0.5, 0.5, // bottom right
            0.5, 0.5, 0.5, // top right
            // back
            -0.5, -0.5, -0.5, // bottom left
            -0.5, 0.5, -0.5, // top left
            0.5, -0.5, -0.5, // bottom right
            0.5, 0.5, -0.5, // top right
    
            // left
            -0.5, -0.5, -0.5, // bottom left
            -0.5, 0.5, -0.5, // top left
            -0.5, -0.5, 0.5, // bottom right
            -0.5, 0.5, 0.5, // top right
    
            // right
            0.5, -0.5, -0.5, // bottom left
            0.5, 0.5, -0.5, // top left
            0.5, -0.5, 0.5, // bottom right
            0.5, 0.5, 0.5, // top right
    
            // top
            -0.5, 0.5, -0.5, // bottom left
            -0.5, 0.5, 0.5, // top left
            0.5, 0.5, -0.5, // bottom right
            0.5, 0.5, 0.5, // top right
    
            // bottom
            -0.5, -0.5, -0.5, // bottom left
            -0.5, -0.5, 0.5, // top left
            0.5, -0.5, -0.5, // bottom right
            0.5, -0.5, 0.5, // top right
        ]);
    
        let indices = new Uint16Array([
            // front
            0, 1, 2,
            1, 3, 2,
            // back
            4, 6, 5,
            5, 6, 7,
            // left
            8, 9, 10,
            9, 11, 10,
            // right
            12, 14, 13,
            13, 14, 15,
            // top
            16, 18, 17,
            17, 18, 19,
            // bottom
            20, 21, 22,
            21, 23, 22
        ]);
    
        let colors = new Float32Array([
            // front
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            // back
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            // left
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            // right
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            // top
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            // bottom
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1
        ]);
    
        let texCoords = new Float32Array([
            // front
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            // back
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            // left
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            // right
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            // top
            0, 1,
            0, 0,
            1, 1,
            1, 0,
            // bottom
            0, 1,
            0, 0,
            1, 1,
            1, 0
        ]);;

        // Set the geometry data
        let cubeGeometryData = {
            positions: vertices,
            indices: indices,
            colors: colors,
            texCoords: texCoords
        }
        return cubeGeometryData;
    }
}
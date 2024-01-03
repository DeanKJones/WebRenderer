import { Texture2D } from "../texture/Texture2D";
import { Geometry } from "./Geometry";

export class GeometryBuilder {
    public createQuadGeometry(texture: Texture2D): Geometry {
        let vertices = new Float32Array([
            // t1 
            -0.5, -0.5, 0.0, // bottom left
            -0.5, 0.5, 0.0,  // top left
            0.5, -0.5, 0.0,  // bottom right
            0.5, 0.5, 0.0,   // top right
        ]);

        let indices = new Uint16Array([

            0, 1, 2, // t1
            1, 3, 2 // t2 
        ]);

        let colors = new Float32Array([
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1
        ]);

        let texCoords = new Float32Array([
            0, 1, // bottom left
            0, 0, // top left
            1, 1, // bottom right
            1, 0  // top right
        ])

        return new Geometry(vertices, indices, colors, texCoords, texture);
    }

    public createCubeGeometry(texture: Texture2D): Geometry {

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

        return new Geometry(vertices, indices, colors, texCoords, texture);
    }
    
    public createGridGeometry(size: number, divisions: number, texture: Texture2D): Geometry {
        const halfSize = size / 2;
        const step = size / divisions;
        const vertices = [];
        const indices = [];
        let index = 0;
    
        for (let i = 0; i <= divisions; i++) {
            const x = -halfSize + (i * step);
    
            // Line 1
            vertices.push(x, 0, halfSize, x, 0, -halfSize);
            indices.push(index++, index++);
    
            // Line 2
            vertices.push(-halfSize, 0, x, halfSize, 0, x);
            indices.push(index++, index++);
        }
    
        const verticesArray = new Float32Array(vertices);
        const indicesArray = new Uint16Array(indices);
    
        // Assuming the grid is white and fully opaque
        const colors = new Float32Array(vertices.length / 3 * 4);
        colors.fill(1);
    
        // Assuming the grid doesn't need texture coordinates
        const texCoords = new Float32Array(vertices.length / 3 * 2);
        texCoords.fill(0);
    
        return new Geometry(verticesArray, indicesArray, colors, texCoords, texture);
    }
} 
import { GeometryData } from "../GeometryData";

export class MeshOBJ
{
    public data: GeometryData;

    private parsed_vertices!: Float32Array;
    private parsed_indices!: Uint16Array;

    private parsed_normals?: Float32Array;
    private parsed_normal_indices?: Uint16Array;

    constructor(objFile: string)
    {
        this.parseOBJ(objFile);
        this.data = this.initData();
    }

    // Init Data
    public initData(): GeometryData 
    {
        let vertices = this.parsed_vertices;
        let indices = this.parsed_indices;
        let normals = this.parsed_normals;
        let normalIndices = this.parsed_normal_indices;

        let colors = new Float32Array([1,1,1,1]);

        let texCoords = new Float32Array([1,1,1,1]);

        // Set the geometry data
        let cubeGeometryData = {
            positions: vertices,
            indices: indices,
            // normals: normals,
            // normalIndices: normalIndices,
            colors: colors,
            texCoords: texCoords
        }
        return cubeGeometryData;
    }

    // Parse OBJ
    public parseOBJ(objString: string)
    {

        //---------------------------------------------
        // Vertices

        let vertexMatch: any;
        let vertexPattern = /^v\s+(\S+)\s+(\S+)\s+(\S+)$/gm;
        let vertices: number[] = [];

        while ((vertexMatch = vertexPattern.exec(objString)) !== null) {
            // Vertex 1
            let vertexData = parseFloat(vertexMatch[1]);
            vertices.push(vertexData);

            // Vertex 2
            vertexData = parseFloat(vertexMatch[2]);
            vertices.push(vertexData);

            // Vertex 3
            vertexData = parseFloat(vertexMatch[3]);
            vertices.push(vertexData);
        }
        this.parsed_vertices = new Float32Array(vertices);

        let indexMatch: any;
        let indexPattern = /^f\s+(\d+)\/\S+\s+(\d+)\/\S+\s+(\d+)\/\S+$/gm;
        let indices: number[] = [];

        while ((indexMatch = indexPattern.exec(objString)) !== null) {
            // Index 1
            let indexData = parseInt(indexMatch[1]);
            indices.push(indexData);

            // Index 2
            indexData = parseInt(indexMatch[2]);
            indices.push(indexData);

            // Index 3
            indexData = parseInt(indexMatch[3]);
            indices.push(indexData);
        }
        this.parsed_indices = new Uint16Array(indices);


        //---------------------------------------------
        // Normals 

        let normalMatch: any;
        let normalPattern = /^vn\s+(\S+)\s+(\S+)\s+(\S+)$/gm;
        let normals: number[] = [];

        while ((normalMatch = normalPattern.exec(objString)) !== null) {
            // Normal 1
            let normalData = parseFloat(normalMatch[1]);
            normals.push(normalData);

            // Normal 2
            normalData = parseFloat(normalMatch[2]);
            normals.push(normalData);

            // Normal 3
            normalData = parseFloat(normalMatch[3]);
            normals.push(normalData);
        }
        this.parsed_normals = new Float32Array(normals);

        let normalIndexMatch: any;
        let normalIndexPattern = /^f\s+\d+\/\S+\/(\d+)\s+\d+\/\S+\/(\d+)\s+\d+\/\S+\/(\d+)$/gm;
        let normalIndices: number[] = [];

        while ((normalIndexMatch = normalIndexPattern.exec(objString)) !== null) {
            // Normal Index 1
            let normalIndexData = parseInt(normalIndexMatch[1]);
            normalIndices.push(normalIndexData);

            // Normal Index 2
            normalIndexData = parseInt(normalIndexMatch[2]);
            normalIndices.push(normalIndexData);

            // Normal Index 3
            normalIndexData = parseInt(normalIndexMatch[3]);
            normalIndices.push(normalIndexData);
        }
        this.parsed_normal_indices = new Uint16Array(normalIndices);
    }
}
import { Geometry } from "../../scene/geometry/Geometry";

export class GeometryBuffers 
{
    public readonly positionsBuffer: GPUBuffer;
    public readonly indicesBuffer?: GPUBuffer;
    public readonly colorsBuffer: GPUBuffer;
    public readonly texCoordsBuffer: GPUBuffer;

    public readonly vertexCount: number;
    public readonly indexCount?: number;

    constructor(device: GPUDevice, geometry: Geometry) 
    {
        // Fix import of value 
        // Load
        let geometryData = geometry.initOBJData();


        // POSITIONS
        this.positionsBuffer = device.createBuffer({
            label: "Positions Buffer",
            size: geometryData.positions.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST 
        });

        device.queue.writeBuffer(this.positionsBuffer, 
            0, 
            geometryData.positions.buffer, 
            0, 
            geometryData.positions.byteLength);

        this.vertexCount = geometryData.positions.length / 3; // (xyz)

        // Adjust indices
        for (let i = 0; i < geometryData.indices.length; i++) {
            geometryData.indices[i]--;
        }

        // INDICES
        if (geometryData.indices.length > 0) 
        {
            this.indicesBuffer = device.createBuffer({
                label: "Indices Buffer",
                size: geometryData.indices.byteLength,
                usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
            });

            device.queue.writeBuffer(this.indicesBuffer,
                0,
                geometryData.indices.buffer,
                0,
                geometryData.indices.byteLength);

            this.indexCount = geometryData.indices.length;
        }
    
        // COLORS
        this.colorsBuffer = device.createBuffer({
            label: "Colors Buffer",
            size: geometryData.colors.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });

        device.queue.writeBuffer(this.colorsBuffer,
            0,
            geometryData.colors.buffer,
            0,
            geometryData.colors.byteLength);

        // TEXCOORDS
        this.texCoordsBuffer = device.createBuffer({
            label: "TexCoords Buffer",
            size: geometryData.texCoords.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });

        device.queue.writeBuffer(this.texCoordsBuffer,
            0,
            geometryData.texCoords.buffer,
            0,
            geometryData.texCoords.byteLength);
    
    }
}
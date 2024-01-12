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
        // POSITIONS
        this.positionsBuffer = device.createBuffer({
            label: "Positions Buffer",
            size: geometry.geometryData.positions.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST 
        });

        device.queue.writeBuffer(this.positionsBuffer, 
            0, 
            geometry.geometryData.positions.buffer, 
            0, 
            geometry.geometryData.positions.byteLength);

        this.vertexCount = geometry.geometryData.positions.length / 3; // (xyz)


        // INDICES
        if (geometry.geometryData.indices.length > 0) 
        {
            this.indicesBuffer = device.createBuffer({
                label: "Indices Buffer",
                size: geometry.geometryData.indices.byteLength,
                usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
            });

            device.queue.writeBuffer(this.indicesBuffer,
                0,
                geometry.geometryData.indices.buffer,
                0,
                geometry.geometryData.indices.byteLength);

            this.indexCount = geometry.geometryData.indices.length;
        }
    
        // COLORS
        this.colorsBuffer = device.createBuffer({
            label: "Colors Buffer",
            size: geometry.geometryData.colors.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });

        device.queue.writeBuffer(this.colorsBuffer,
            0,
            geometry.geometryData.colors.buffer,
            0,
            geometry.geometryData.colors.byteLength);

        // TEXCOORDS
        this.texCoordsBuffer = device.createBuffer({
            label: "TexCoords Buffer",
            size: geometry.geometryData.texCoords.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });

        device.queue.writeBuffer(this.texCoordsBuffer,
            0,
            geometry.geometryData.texCoords.buffer,
            0,
            geometry.geometryData.texCoords.byteLength);
    
    }
}
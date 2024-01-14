import { RenderContext } from "../../../render_pipelines/RenderContext";
import { Geometry } from "../Geometry";
import { GeometryData } from "../GeometryData";



export class Grid extends Geometry 
{
    constructor (context: RenderContext)
    {
        super(context, () => this.initData());
    }

    private initData(): GeometryData {
        const size = 10;
        const divisions = 10;

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

        let geometryData = {
            positions: verticesArray,
            indices: indicesArray,
            colors: colors,
            texCoords: texCoords
        }
        return geometryData;
    }
}
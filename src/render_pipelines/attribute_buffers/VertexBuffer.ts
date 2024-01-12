
export class VertexBuffer{

    private _bufferLayout: Array<GPUVertexBufferLayout> = [];

    constructor() {
        this.createVertexBufferLayout();
    }

    // ------------------------------------------
    // CREATE VERTEX BUFFER LAYOUT

    public createVertexBufferLayout() : Array<GPUVertexBufferLayout> {
        this._bufferLayout.push({
            arrayStride: 3 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [
                {
                    shaderLocation: 0,
                    offset: 0,
                    format: "float32x3"
                }
            ],
        })

        this._bufferLayout.push({
            arrayStride: 4 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [
                {
                    shaderLocation: 1,
                    offset: 0,
                    format: "float32x4"
                }
            ],
        })

        this._bufferLayout.push({
            arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT,
            attributes: [
                {
                    shaderLocation: 2,
                    offset: 0,
                    format: "float32x2"
                }
            ],
        })
        return this._bufferLayout;
    }

    // ------------------------------------------
    // GETTERS

    public getBufferLayout() : Array<GPUVertexBufferLayout> {
        return this._bufferLayout;
    }
}
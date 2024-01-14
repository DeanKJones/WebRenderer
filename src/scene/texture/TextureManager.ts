import { Texture2D } from "./Texture2D";

export class TextureManager 
{
    private _textures: Map<string, Texture2D> = new Map();

    constructor(private device: GPUDevice) {}

    public async loadTexture(id: string, url: string): Promise<void> {
        const image = await this.loadImage(url);
        const texture = await Texture2D.create(this.device, image);
        this._textures.set(id, texture);
    }

    public getTexture(id: string): Texture2D | undefined {
        return this._textures.get(id);
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = url;
        });
    }
}
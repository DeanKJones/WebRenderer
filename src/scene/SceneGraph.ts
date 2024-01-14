import { Mat4x4 } from "../utils/math/Mat4x4";
import { Geometry } from "./geometry/Geometry";


export class NodeGraph {
    public parent: NodeGraph | null = null;
    public children: NodeGraph[] = [];

    public localTransform: Mat4x4 = Mat4x4.identity();
    public worldTransform: Mat4x4 = Mat4x4.identity();
    public geometry?: Geometry;

    private isDirty: boolean = true;

    
    public addChild(node: NodeGraph): void {
        node.parent = this;
        node.markDirty();
        this.children.push(node);
    }

    public removeChild(node: NodeGraph): NodeGraph | undefined {
        const index = this.children.indexOf(node);
        if (index !== -1) {
            node.parent = null;
            return this.children.splice(index, 1)[0];
        }
    }

    public markDirty(): void {
        if (!this.isDirty) {
            this.isDirty = true;
            for (const child of this.children) {
                child.markDirty();
            }
        }
    }

    public updateTransform(): void {
        if (this.isDirty) {
            this.worldTransform = this.parent ? Mat4x4.multiply(this.parent.worldTransform, this.localTransform) : this.localTransform;
            this.isDirty = false;
        }

        for (const child of this.children) {
            child.updateTransform();
        }
    }

    // public getTransform(): Mat4x4 {
    //     return this.transform;
    // }

    public getChildren(): NodeGraph[] {
        return this.children;
    }

    public getGeometry(): Geometry | undefined {
        return this.geometry;
    }

    public setGeometry(geometry: Geometry): void {
        this.geometry = geometry;
    }
}
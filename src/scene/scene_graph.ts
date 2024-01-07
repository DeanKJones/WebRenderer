import { Mat4x4 } from "../utils/math/Mat4x4";
import { Geometry } from "./geometry/Geometry";


export class NodeGraph {
    public parent: NodeGraph | null = null;
    public children: NodeGraph[] = [];
    public transform: Mat4x4 = Mat4x4.identity();
    public geometry?: Geometry;

    public addChild(node: NodeGraph): void {
        node.parent = this;
        this.children.push(node);
    }

    public removeChild(node: NodeGraph): void {
        const index = this.children.indexOf(node);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    public updateTransform(): void {
        if (this.parent) {
            this.transform = Mat4x4.multiply(this.parent.transform, this.transform);
        }

        for (const child of this.children) {
            child.updateTransform();
        }
    }

    public getTransform(): Mat4x4 {
        return this.transform;
    }

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
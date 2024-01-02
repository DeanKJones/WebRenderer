export class Vec3 extends Float32Array {
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(3);

        this[0] = x;
        this[1] = y;
        this[2] = z;
    }

    public get x(): number {
        return this[0];
    }

    public set x(value: number) {
        this[0] = value;
    }

    public get y(): number {
        return this[1];
    }

    public set y(value: number) {
        this[1] = value;
    }

    public get z(): number {
        return this[2];
    }

    public set z(value: number) {
        this[2] = value;
    }

    public add(v: Vec3): Vec3 {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    public static subtract(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    public multiply(scalar: number): Vec3 {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    public divide(scalar: number): Vec3 {
        if (scalar !== 0) {
            const inverseScalar = 1 / scalar;
            return new Vec3(this.x * inverseScalar, this.y * inverseScalar, this.z * inverseScalar);
        } else {
            throw new Error("Cannot divide by zero.");
        }
    }

    public dot(v: Vec3): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public static cross(v1: Vec3, v2: Vec3): Vec3 {
        const x = v1.y * v2.z - v1.z * v2.y;
        const y = v1.z * v2.x - v1.x * v2.z;
        const z = v1.x * v2.y - v1.y * v2.x;
        return new Vec3(x, y, z);
    }

    public calculateLength(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public static normalize(v: Vec3): Vec3 {
        const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        return new Vec3(v.x / length, v.y / length, v.z / length);
    }

    public static distance(v1: Vec3, v2: Vec3): number {
        const x = v1.x - v2.x;
        const y = v1.y - v2.y;
        const z = v1.z - v2.z;
        return Math.sqrt(x * x + y * y + z * z);
    }
}
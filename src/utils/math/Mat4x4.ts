import { DEGREES_TO_RADIANS } from "./MathUtil";
import { Vec3 } from "./Vec3";

export class Mat4x4 extends Float32Array {
    constructor() {
        super(16);
        this.set([
            1, 0, 0, 0, // Row 1
            0, 1, 0, 0, // Row 2
            0, 0, 1, 0, // Row 3
            0, 0, 0, 1  // Row 4
        ]);
    }

    public static multiply(a: Mat4x4, b: Mat4x4): Mat4x4 {

        const r0c0 = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3];
        const r1c0 = a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7];
        const r2c0 = a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11];
        const r3c0 = a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15];

        const r0c1 = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3];
        const r1c1 = a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7];
        const r2c1 = a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11];
        const r3c1 = a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15];

        const r0c2 = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3];
        const r1c2 = a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7];
        const r2c2 = a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11];
        const r3c2 = a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15];

        const r0c3 = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3];
        const r1c3 = a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7];
        const r2c3 = a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11];
        const r3c3 = a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15];

        const m = new Mat4x4();
        m.set([
            r0c0, r0c1, r0c2, r0c3,
            r1c0, r1c1, r1c2, r1c3,
            r2c0, r2c1, r2c2, r2c3,
            r3c0, r3c1, r3c2, r3c3
        ]);

        return m;
    }

    public static multiplyVec3(m: Mat4x4, v: Vec3) : Vec3
    {
        const x = v.x * m[0] + v.y * m[4] + v.z * m[8] + m[12];
        const y = v.x * m[1] + v.y * m[5] + v.z * m[9] + m[13];
        const z = v.x * m[2] + v.y * m[6] + v.z * m[10] + m[14];

        return new Vec3(x, y, z);
    }

    public static rotationAxis(axis: Vec3, angle: number): Mat4x4 
    {
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        const t = 1 - c;

        const x = axis.x;
        const y = axis.y;
        const z = axis.z;

        const m = new Mat4x4();
        m.set([
            t * x * x + c, t * x * y - s * z, t * x * z + s * y, 0,
            t * x * y + s * z, t * y * y + c, t * y * z - s * x, 0,
            t * x * z - s * y, t * y * z + s * x, t * z * z + c, 0,
            0,                 0,                 0,             1
        ]);

        return m;
    }


    public static identity(): Mat4x4 {
        return new Mat4x4();
    }

    public static translation(x: number, y: number, z: number): Mat4x4 {
        const m = new Mat4x4();
        m.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ])
        return m;
    }

    public static scale(x: number, y: number, z: number): Mat4x4 {
        const m = new Mat4x4();
        m.set([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ])
        return m;
    }

    public static rotationX(angle: number): Mat4x4 {
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const m = new Mat4x4();
        m.set([
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]);

        return m;
    }

    public static rotationY(angle: number): Mat4x4 {
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const m = new Mat4x4();
        m.set([
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]);

        return m;
    }

    public static rotationZ(angle: number): Mat4x4 {
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const m = new Mat4x4();
        m.set([
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);

        return m;
    }

    public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4x4 {
        const r0c0 = 2 / (right - left);
        const r1c2 = 2 / (top - bottom);
        const r2c2 = 1 / (far - near);

        const r3c0 = -(right + left) / (right - left); // -1 to 1 
        const r3c1 = -(top + bottom) / (top - bottom); // -1 to 1
        const r3c2 = -near / (far - near); // 0 to 1

        const m = new Mat4x4();
        m.set([
            r0c0, 0, 0, 0,
            0, r1c2, 0, 0,
            0, 0, r2c2, 0,
            r3c0, r3c1, r3c2, 1
        ]);
        return m;
    }

    public static perspective(fov: number, aspect: number, near: number, far: number): Mat4x4 {

        fov *= DEGREES_TO_RADIANS;

        const r0c0 = 1 / (aspect * Math.tan(fov / 2));
        const r1c1 = 1 / Math.tan(fov / 2);

        const r2c2 = -far / (near - far);
        const r3c2 = (near * far) / (near - far);

        const m = new Mat4x4();
        m.set([
            r0c0, 0, 0, 0,
            0, r1c1, 0, 0,
            0, 0, r2c2, 1,
            0, 0, r3c2, 0
        ]);
        return m;
    }

    public static view(eye: Vec3, target: Vec3, up: Vec3): Mat4x4 {
        const zAxis = Vec3.normalize(Vec3.subtract(target, eye));
        const xAxis = Vec3.normalize(Vec3.cross(up, zAxis));
        const yAxis = Vec3.cross(zAxis, xAxis);

        const m = new Mat4x4();
        m.set([
            xAxis.x,         yAxis.x,         zAxis.x,         0,
            xAxis.y,         yAxis.y,         zAxis.y,         0,
            xAxis.z,         yAxis.z,         zAxis.z,         0,
            -xAxis.dot(eye), -yAxis.dot(eye), -zAxis.dot(eye), 1
        ]);
        return m;
    }

    public static normalize(v: Vec3): Vec3 {
        const length = v.calculateLength();
        return new Vec3(v.x / length, v.y / length, v.z / length);
    }
}
import { Vec3 } from "./Vec3";

export class Quaternion 
{
    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1)
    {
    }

    public static multiply(q1: Quaternion, q2: Quaternion): Quaternion
    {
        const x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
        const y = q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x;
        const z = q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w;
        const w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;

        return new Quaternion(x, y, z, w);
    }

    public static fromAxisAngle(axis: Vec3, angle: number): Quaternion
    {
        const halfAngle = angle * 0.5;
        const s = Math.sin(halfAngle);
        const c = Math.cos(halfAngle);

        return new Quaternion(axis.x * s, axis.y * s, axis.z * s, c);
    }

    public static fromEulerAngles(x: number, y: number, z: number): Quaternion
    {
        const halfX = x * 0.5;
        const halfY = y * 0.5;
        const halfZ = z * 0.5;

        const sx = Math.sin(halfX);
        const cx = Math.cos(halfX);
        const sy = Math.sin(halfY);
        const cy = Math.cos(halfY);
        const sz = Math.sin(halfZ);
        const cz = Math.cos(halfZ);

        const x1 = cx * sy * sz + cy * cz * sx;
        const y1 = cx * cz * sy - cy * sx * sz;
        const z1 = cx * cy * sz - cz * sx * sy;
        const w1 = cx * cy * cz + sx * sy * sz;

        return new Quaternion(x1, y1, z1, w1);
    }

    public static identity(): Quaternion
    {
        return new Quaternion(0, 0, 0, 1);
    }

    public static conjugate(q: Quaternion): Quaternion
    {
        return new Quaternion(-q.x, -q.y, -q.z, q.w);
    }

    public static inverse(q: Quaternion): Quaternion
    {
        const length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
        const inverseLength = 1 / length;

        return new Quaternion(-q.x * inverseLength, -q.y * inverseLength, -q.z * inverseLength, q.w * inverseLength);
    }

    public static dot(q1: Quaternion, q2: Quaternion): number
    {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
    }

    public static normalize(q: Quaternion): Quaternion
    {
        const length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
        const inverseLength = 1 / length;

        return new Quaternion(q.x * inverseLength, q.y * inverseLength, q.z * inverseLength, q.w * inverseLength);
    }
}
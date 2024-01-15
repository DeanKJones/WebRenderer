
import { Camera } from "../scene/camera/Camera";

import { Color } from "../utils/math/Color";
import { Mat4x4 } from "../utils/math/Mat4x4";
import { Texture2D } from "../scene/texture/Texture2D";

import { UniformBuffer } from "./uniform_buffers/UniformBuffer";

import { GeometryBindGroup } from "./bind_groups/GeometryBindGroup";
import { ProjectionBindGroup } from "./bind_groups/ProjectionBindGroup";
import { Geometry } from "../scene/geometry/Geometry";


export class BindGroupManager 
{
    public pipelineLayout!: GPUPipelineLayout;

    private _bindGroups: Map<string, GPUBindGroup> = new Map();
    private _geometryBindGroups = new Map<Geometry, GPUBindGroup>();

    private _viewMatrixBuffer: UniformBuffer;
    private _modelMatrixBuffer: UniformBuffer;
    private _diffuseColorBuffer: UniformBuffer;
    private _texture: Texture2D;

    private _viewMatrix: Mat4x4 = new Mat4x4();
    private _modelMatrix: Mat4x4 = new Mat4x4();
    private _diffuseColor: Color = Color.white();

    constructor(private device: GPUDevice, camera: Camera, texture: Texture2D) 
    {
        this._texture = texture;

        this._viewMatrixBuffer = new UniformBuffer(device,
            this._viewMatrix,
            "Transform Buffer");

        this._modelMatrixBuffer = new UniformBuffer(device,
            this._modelMatrix,
            "Model Matrix Buffer");

        this._diffuseColorBuffer = new UniformBuffer(device,
            this._diffuseColor,
            "Diffuse Color Buffer");

        this._bindGroups.set('projectionView', 
                              this.createProjectionViewBindGroup(camera));
    }

    // ------------------------------------------
    // CREATE PIPELINE LAYOUT

    public createPipelineLayout() : GPUPipelineLayout {
        // Check if the pipeline layout has already been created
        // TODO - this is a hacky way to do this, but it works for now
        if(this.pipelineLayout) 
            return this.pipelineLayout;
        // Create the bind group layouts
        const geometryGroupLayout = this.createGeometryGroupLayout();
        const projectionViewGroupLayout = this.createProjectionViewGroupLayout();

        this.pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [
                geometryGroupLayout,            // group 0
                projectionViewGroupLayout,      // group 1
            ]
        });
        return this.pipelineLayout;
    }

    // ------------------------------------------
    // CREATE BIND GROUP LAYOUTS

    public createGeometryGroupLayout() : GPUBindGroupLayout {
        const geometryBindGroup = this.device.createBindGroupLayout({
            entries: [
                {   // Model matrix
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {}
                },
                {   // Texture
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: {}
                },
                {   // Sampler
                    binding: 2,
                    visibility: GPUShaderStage.FRAGMENT,
                    sampler: {}
                },
                {   // Diffuse color
                    binding: 3,
                    visibility: GPUShaderStage.FRAGMENT,
                    buffer: {}
                }
            ]
        });
        return geometryBindGroup;
    }

    public createProjectionViewGroupLayout() : GPUBindGroupLayout {
        // The projection view matrix group for the camera
        const projectionViewBindGroup = this.device.createBindGroupLayout({
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {}
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {}
                }
            ]
        });
        return projectionViewBindGroup
    }

    // ------------------------------------------
    // CREATE BIND GROUPS

    public createProjectionViewBindGroup(camera: Camera) : GPUBindGroup {
        return new ProjectionBindGroup(this.device, 
                                       this.createProjectionViewGroupLayout(), 
                                       this._viewMatrixBuffer.buffer, 
                                       camera.buffer.buffer).createBindGroup();
    }

    public createGeometryBindGroup(geometry: Geometry) : GPUBindGroup {
        const bindGroup = new GeometryBindGroup(this.device, 
                                     this.createGeometryGroupLayout(), 
                                     this._modelMatrixBuffer.buffer, 
                                     this._texture,
                                     this._diffuseColorBuffer.buffer).createBindGroup();

        this._geometryBindGroups.set(geometry, bindGroup);
        return bindGroup;
    }

    // ------------------------------------------
    // UPDATE GEOMETRY BIND GROUP

    public updateGeometryBindGroup(geometry: Geometry) {
        this._modelMatrixBuffer = new UniformBuffer(this.device,
            geometry.modelMatrix,
            "Model Matrix Buffer");

        this._texture = geometry.texture;

        const bindGroup = new GeometryBindGroup(this.device, 
                                                this.createGeometryGroupLayout(),
                                                this._modelMatrixBuffer.buffer,
                                                this._texture,
                                                this._diffuseColorBuffer.buffer).createBindGroup();

        this._geometryBindGroups.set(geometry, bindGroup);
    }

    // ------------------------------------------
    // UPDATE PROJECTION VIEW BIND GROUP
    public updateProjectionViewBindGroup(camera: Camera) {
        this._viewMatrixBuffer = new UniformBuffer(this.device,
            camera.projectionView,
            "View Matrix Buffer");

        this.setBindGroupByName('projectionView', new ProjectionBindGroup(this.device, 
                                                            this.createProjectionViewGroupLayout(), 
                                                            this._viewMatrixBuffer.buffer, 
                                                            camera.buffer.buffer).createBindGroup());
    }

    // ------------------------------------------
    // GETTERS

    public getViewMatrixBuffer() : UniformBuffer {
        return this._viewMatrixBuffer;
    }

    public get_ModelMatrixBuffer() : UniformBuffer {
        return this._modelMatrixBuffer;
    }

    public get_DiffuseColorBuffer() : UniformBuffer {
        return this._diffuseColorBuffer;
    }

    public getBindGroupByName(name: string) : GPUBindGroup {
        return this._bindGroups.get(name) as GPUBindGroup;
    }

    public getGeometryBindGroup(geometry: Geometry) : GPUBindGroup {
        return this._geometryBindGroups.get(geometry) as GPUBindGroup;
    }

    // ------------------------------
    // SETTERS 
    
    public set transform(value: Mat4x4) 
    {
        this._viewMatrix = value;
        this._viewMatrixBuffer.update(value);
    }
    
    public set modelMatrix(value: Mat4x4) 
    {
        this._modelMatrix = value;
        this._modelMatrixBuffer.update(value);
    }
    
    public set diffuseColor(value: Color) 
    {
        this._diffuseColor = value;
        this._diffuseColorBuffer.update(value);
    }

    public setBindGroupByName(name: string, bindGroup: GPUBindGroup) {
        this._bindGroups.set(name, bindGroup);
    }
}
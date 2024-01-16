//import { Object } from './geometry/Object';
import { RenderContext } from '../render_pipelines/RenderContext';
import { GeometryBuffers } from '../render_pipelines/attribute_buffers/GeometryBuffers';
import { loadImage } from '../utils/engine/image_utils';
import { Camera } from './camera/Camera';

import { Geometry } from './geometry/Geometry';

import { NodeGraph } from './SceneGraph';
import { Texture2D } from './texture/Texture2D';
import { Mat4x4 } from '../utils/math/Mat4x4';

export class Scene 
{
    // Context
    public context: RenderContext;

    // Will get resolved in createCubeScene()
    private _camera!: Camera;
    private _sceneGraph: NodeGraph;

    private _renderContexts: Array<RenderContext>;
    private _geometryBuffers: Array<GeometryBuffers>;

    private _geometry: Array<Geometry>;

    //---------------------------------
    // CONSTRUCTOR

    constructor(context: RenderContext) 
    {
        this.context = context;
        this._sceneGraph = new NodeGraph();

        // Initialize arrays
        this._renderContexts = [];
        this._geometryBuffers = [];
        this._geometry = [];

        this.createCubeScene();
    }

    //---------------------------------
    // CREATE SCENE

    private async createCubeScene(): Promise<void> {
        // Scene setup
        this._camera = new Camera(this.context.device, this.context.canvas);
        // Texture setup
        const image = await loadImage("assets/textures/ramzi_texture.jpeg");
        const texture = await Texture2D.create(this.context.device, image);

        const image2 = await loadImage("assets/textures/test_texture.jpeg");
        const texture2 = await Texture2D.create(this.context.device, image2);

        // Geometry setup
        const geometry = new Geometry(this.context);
        this._geometry.push(geometry);
        const geometry2 = new Geometry(this.context);
        this._geometry.push(geometry2);
        const geometry3 = new Geometry(this.context);
        this._geometry.push(geometry3);

        // Create the render context
        const geometryNode_01 = new NodeGraph();
        const context = new RenderContext(this.context.device, this._camera, this.context.canvas, texture);
        const geometryBuffers = new GeometryBuffers(this.context.device, geometry);

        const geometryNode_02 = new NodeGraph();
        const context2 = new RenderContext(this.context.device, this._camera, this.context.canvas, texture2);
        const geometryBuffers2 = new GeometryBuffers(this.context.device, geometry2);

        const geometryNode_03 = new NodeGraph();
        const context3 = new RenderContext(this.context.device, this._camera, this.context.canvas, texture2);
        const geometryBuffers3 = new GeometryBuffers(this.context.device, geometry3);

        // Add to the list of render contexts
        this._renderContexts.push(context);
        this._renderContexts.push(context2);
        this._renderContexts.push(context3);

        // Add to the list of geometry buffers
        this._geometryBuffers.push(geometryBuffers);
        this._geometryBuffers.push(geometryBuffers2);
        this._geometryBuffers.push(geometryBuffers3);

        // Add to the scene graph
        this._sceneGraph.addChild(geometryNode_01);
        this._sceneGraph.addChild(geometryNode_02);
        this._sceneGraph.addChild(geometryNode_03);
    }

    //---------------------------------
    // RENDER
    public draw(renderPassEncoder: GPURenderPassEncoder, pipeline: GPURenderPipeline) 
    {
        for (let geometry of this._geometry) {
            geometry.draw(renderPassEncoder, pipeline);
        }
    }



    //---------------------------------
    // GETTERS

    public getCamera(): Camera {
        return this._camera;
    }

    public getSceneRenderContexts(): Array<RenderContext> {
        return this._renderContexts;
    }

    public getSceneGeometryBuffers(): Array<GeometryBuffers> {
        return this._geometryBuffers;
    }

    public getSceneGeometry(): Array<Geometry> {
        return this._geometry;
    }

    public getGeometryByIndex(index: number): Geometry {
        return this._geometry[index];
    }


    //---------------------------------
    // SETTERS

    public setSceneRenderContextByIndex(context: RenderContext, index: number): void {
        this._renderContexts[index] = context;
    }

    public setGeometryTransformByIndex(transform: Mat4x4, index: number) 
    {
        this._geometry[index].transform = transform;
    }
}
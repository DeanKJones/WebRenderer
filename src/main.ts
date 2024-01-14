import { Camera } from "./scene/camera/Camera";

import { Mat4x4 } from "./utils/math/Mat4x4";

import { UnlitRenderPipeline } from "./render_pipelines/pipelines/UnlitRenderPipeline";
import { Texture2D } from "./scene/texture/Texture2D";
import { RenderContext } from "./render_pipelines/RenderContext";
import { loadImage } from "./utils/engine/image_utils";
import { Cube } from "./scene/geometry/primitives/Cube";
import { Geometry } from "./scene/geometry/Geometry";


let angle = 0;

async function init() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const gpuContext = canvas.getContext("webgpu") as GPUCanvasContext;

  if (!gpuContext) {
    alert("WebGPU not supported")
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();

  const device = await adapter!.requestDevice();

  gpuContext.configure({
    device: device,
    format: "bgra8unorm"
  });

  // Scene setup
  const camera = new Camera(device, canvas);
  // Texture setup
  const image = await loadImage("assets/textures/test_texture.jpeg");
  const texture =  await Texture2D.create(device, image);

  const context = new RenderContext(device, camera, canvas, texture);

  // Geometry setup
  const geometry:  Geometry = new Geometry(context);
  const geometry2: Geometry = new Geometry(context);
  const geometry3: Geometry = new Geometry(context);
  
  const draw = () => 
  {
    const commandEncoder = device.createCommandEncoder();
    
    const renderPassEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: gpuContext.getCurrentTexture().createView(),
        storeOp: "store",
        clearValue: { r: 0.5, g: 0.7, b: 0.9, a: 1.0 },
        loadOp: "clear"
      }],
      depthStencilAttachment: {
        view: context.depthTexture.createView(),
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
        stencilClearValue: 0,
        stencilLoadOp: 'clear',
        stencilStoreOp: 'store',
      }
    });
    
    // Create the render pipeline
    const unlitPipeline = new UnlitRenderPipeline(context);
    const pipeline = unlitPipeline.pipeline;

    // DRAW HERE
    angle += 0.02;
    let matrixTransforms = Mat4x4.multiply(Mat4x4.translation(0.5, -0.5, 0), Mat4x4.rotationX(angle*0.5));
    matrixTransforms = Mat4x4.multiply(matrixTransforms, Mat4x4.scale(0.5, 0.5, 0.5));
    geometry.transform = Mat4x4.multiply(matrixTransforms, Mat4x4.rotationY(angle*0.5));

    let matrixTransforms2 = Mat4x4.multiply(Mat4x4.translation(0, 0.5, 0), Mat4x4.rotationX(angle));
    matrixTransforms2 = Mat4x4.multiply(matrixTransforms2, Mat4x4.scale(0.6, 0.6, 0.6));
    geometry2.transform = Mat4x4.multiply(matrixTransforms2, Mat4x4.rotationY(angle));

    let matrixTransforms3 = Mat4x4.multiply(Mat4x4.translation(-0.5, -0.5, 0), Mat4x4.scale(0.3, 0.3, 0.3));
    geometry3.transform = Mat4x4.multiply(matrixTransforms3, Mat4x4.rotationY(-angle));

    context.bindGroupManager.updateGeometryBindGroup(geometry);
    context.bindGroupManager.updateGeometryBindGroup(geometry2);
    context.bindGroupManager.updateGeometryBindGroup(geometry3);

    geometry.draw(renderPassEncoder, context, pipeline);
    geometry2.draw(renderPassEncoder, context, pipeline);
    geometry3.draw(renderPassEncoder, context, pipeline);

    renderPassEncoder.end();
    device.queue.submit([
      commandEncoder.finish()
    ]);

    requestAnimationFrame(draw);
  }

  draw();
}


init();
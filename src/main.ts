import { Camera } from "./scene/camera/Camera";

import { Mat4x4 } from "./utils/math/Mat4x4";

import { UnlitRenderPipeline } from "./render_pipelines/pipelines/UnlitRenderPipeline";
import { Texture2D } from "./scene/texture/Texture2D";
import { RenderContext } from "./render_pipelines/RenderContext";
import { loadImage } from "./utils/engine/image_utils";

import { Scene } from "./scene/Scene";


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

  // Scene setup
  const scene = new Scene(context);
  
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

    // Update Angle
    angle += 0.02;

    for (let i = 0; i < scene.getSceneGeometry().length; i++) 
    {
      // Create transform matrix
    let matrixTransforms = Mat4x4.multiply(Mat4x4.translation(-0.75 + i * 0.75, -0.5 + i * 0.5, 0), Mat4x4.rotationX(angle*0.5));
    matrixTransforms = Mat4x4.multiply(matrixTransforms, Mat4x4.scale(0.5, 0.5, 0.5));
    matrixTransforms = Mat4x4.multiply(matrixTransforms, Mat4x4.rotationY(angle*0.5));
    // Update the geometry
    scene.setGeometryTransformByIndex(matrixTransforms, i);
    scene.getGeometryByIndex(i).updateGeometryBindGroup();
    }


    scene.draw(renderPassEncoder, pipeline);

    renderPassEncoder.end();
    device.queue.submit([
      commandEncoder.finish()
    ]);

    requestAnimationFrame(draw);
  }

  draw();
}


init();
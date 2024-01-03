import { GeometryBuffers } from "./render_pipelines/attribute_buffers/GeometryBuffers";
import { Camera } from "./scene/camera/Camera";
import { GeometryBuilder } from "./scene/geometry/GeometryBuilder";

//import { Color } from "./math/Color";
import { Mat4x4 } from "./utils/math/Mat4x4";

import { UnlitRenderPipeline } from "./render_pipelines/UnlitRenderPipeline/UnlitRenderPipeline";
import { Texture2D } from "./scene/texture/Texture2D";
import { RenderContext } from "./render_pipelines/RenderContext";

async function loadImage(path: string): Promise<HTMLImageElement> {

  return new Promise((resolve, reject) => {

    const image = new Image();
    image.src = path;
    image.onload = () => resolve(image);
    image.onerror = reject;

  });
}

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

  const geometry = new GeometryBuilder().createCubeGeometry(texture);

  // Create the render context
  const context = new RenderContext(device, camera, canvas, texture);
  const geometryBuffers = new GeometryBuffers(device, geometry);
  
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

    // DRAW HERE
    angle += 0.02;
    let matrixTransforms = Mat4x4.multiply(Mat4x4.translation(0, 0, 0), Mat4x4.rotationX(angle));
    geometry.transform = Mat4x4.multiply(matrixTransforms, Mat4x4.rotationY(angle));

    context.bindGroupManager.updateGeometryBindGroup(geometry);

    unlitPipeline.draw(renderPassEncoder, geometryBuffers, context);

    renderPassEncoder.end();
    device.queue.submit([
      commandEncoder.finish()
    ]);

    requestAnimationFrame(draw);
  }

  draw();
}


init();
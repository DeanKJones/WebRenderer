import shaderSource from "../../shaders/UnlitMaterialShader.wgsl?raw"

export class ShaderProgram {
  private shaderModule: GPUShaderModule;

  constructor(device: GPUDevice) {
    this.shaderModule = device.createShaderModule({ code: shaderSource });
  }

  get module(): GPUShaderModule {
    return this.shaderModule;
  }
}
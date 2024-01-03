struct VSInput 
{
    @location(0) position: vec3f, 
    @location(1) color: vec4f, 
    @location(2) texCoord: vec2f,
}

struct VSOutput {
    @builtin(position) position: vec4f,
    @location(1) color: vec4f,
    @location(2) texCoord: vec2f,
}

@group(0) @binding(0)
var<uniform> modelMatrix: mat4x4f;

@group(1) @binding(0)
var<uniform> projectionView: mat4x4f;

@group(1) @binding(1)
var<uniform> viewMatrix: mat4x4f;

@vertex 
fn unlitMaterialVS(
    in: VSInput,

    // builtins 
    @builtin(vertex_index) vid: u32 
) -> VSOutput
{
    var out : VSOutput;
    out.position = projectionView * viewMatrix * modelMatrix * vec4f(in.position, 1.0);
    out.color = in.color;
    out.texCoord = in.texCoord;

    return out;
}

@group(0) @binding(1)
var diffuseTexture: texture_2d<f32>;
@group(0) @binding(2)
var diffuseTexSampler: sampler;

@group(0) @binding(3)
var<uniform> diffuseColor: vec4f;


@fragment
fn unlitMaterialFS(in : VSOutput) -> @location(0) vec4f
{
    return textureSample(diffuseTexture, diffuseTexSampler, in.texCoord) * in.color * diffuseColor;
}
[[stage(vertex)]]
fn main(
    [[builtin(vertex_index)]] vertex_index: u32,
    [[builtin(instance_index)]] instance_index: u32
) -> [[builtin(position)]] vec4<f32> {
    var position: array<vec2<f32>, 4> = array<vec2<f32>, 4>(
        vec2<f32>(-1.0, 0.0),
        vec2<f32>(-1.0, 0.0),
        vec2<f32>(1.0, 0.0),
        vec2<f32>(1.0, 0.0)
    );

    position[0].x += f32(vertex_index % 2);
    position[1].x += f32(vertex_index % 2);
    position[2].x += f32(vertex_index % 2);
    position[3].x += f32(vertex_index % 2);

    position[0].y += f32(vertex_index / 2);
    position[1].y += f32(vertex_index / 2);
    position[2].y += f32(vertex_index / 2);
    position[3].y += f32(vertex_index / 2);

    var world_position: vec3<f32> = vec3<f32>(position[instance_index], 0.0);

    return vec4<f32>(world_position, 1.0);
}

[[stage(fragment)]]
fn main() -> [[location(0)]] vec4<f32> {
    return vec4<f32>(1.0, 1.0, 1.0, 1.0);
}

precision highp float;

varying vec3 vColor;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    gl_FragColor = vec4(vColor, 1.0);
}
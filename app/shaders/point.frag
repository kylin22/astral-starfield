precision highp float;

varying vec4 vColor;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // float alpha = smoothstep(0.3, 0.5, dist) * vColor.a;
    gl_FragColor = vColor;
}
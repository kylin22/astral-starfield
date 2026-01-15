// pointsCircle.frag
precision highp float;

varying vec3 vColor;

void main() {
    // gl_PointCoord ranges from 0 to 1 across the square
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    // Discard pixels outside radius -> circular points
    if (dist > 0.5) discard;

    gl_FragColor = vec4(vColor, 1.0);
}

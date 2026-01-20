precision highp float;

uniform float size;
varying vec4 vColor;

void main() {
    vColor = color;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = size * 50.0 / max(0.0001, -mvPosition.z);

}
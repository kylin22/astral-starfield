// pointsCircle.vert
precision highp float;

attribute vec3 position;
attribute vec3 color;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float size;

varying vec3 vColor;

void main() {
    vColor = color;

    // Transform to camera space
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective size attenuation
    gl_PointSize = size / -mvPosition.z;
}

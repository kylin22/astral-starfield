const bpRpToTeff = (bp_rp: number): number => {
  const bp = Math.min(Math.max(bp_rp, -0.5), 4.0)

  const logT =
    3.981 -
    0.654 * bp +
    0.158 * bp * bp -
    0.032 * bp * bp * bp

  return Math.pow(10, logT)
}

const temperatureToRGB = (tempK: number): [number, number, number] => {
  // Guard against bad input
  if (!Number.isFinite(tempK)) {
    return [1, 1, 1]
  }

  // Clamp to physically meaningful range
  const T = Math.max(1000, Math.min(40000, tempK)) / 100

  let r = 0
  let g = 0
  let b = 0

  // Red
  if (T <= 66) {
    r = 255
  } else {
    r = 329.698727446 * Math.pow(T - 60, -0.1332047592)
    r = Math.min(255, Math.max(0, r))
  }

  // Green
  if (T <= 66) {
    g = 99.4708025861 * Math.log(T) - 161.1195681661
  } else {
    g = 288.1221695283 * Math.pow(T - 60, -0.0755148492)
  }
  g = Math.min(255, Math.max(0, g))

  // Blue
  if (T >= 66) {
    b = 255
  } else if (T <= 19) {
    b = 0
  } else {
    b = 138.5177312231 * Math.log(T - 10) - 305.0447927307
    b = Math.min(255, Math.max(0, b))
  }

  // Normalize to 0–1 for Three.js
  return [r / 255, g / 255, b / 255]
}

export const gaiaBP_RPtoRGB = (bp_rp: number): [number, number, number] => {
  // if (!Number.isFinite(bp_rp)) {
  //   return [1, 1, 1]
  // }

  // const teff = bpRpToTeff(bp_rp)
  // return temperatureToRGB(teff)
  return [
    Math.random(), // r ∈ [0,1]
    Math.random(), // g ∈ [0,1]
    Math.random(), // b ∈ [0,1]
  ]
}
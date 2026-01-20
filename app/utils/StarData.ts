// import { bprpToTeff, teffToRGB, teffToAlpha } from "@/utils/gaiaColorConversion";

// export default class StarData {
//   private coordinates: Float32Array;
//   private bp_rp: number;

//   constructor(x: number, y: number, z: number, bp_rp: number) {
//     this.coordinates = new Float32Array([x, y, z]);
//     this.bp_rp = bp_rp;
//   }

//   getCoordinates(): Float32Array {
//     return this.coordinates;
//   }

//   getColorRGBA(): [number, number, number, number] {
//     const teff = bprpToTeff(this.bp_rp);
//     const rgb = teffToRGB(teff);
//     const alpha = teffToAlpha(teff);
//     return [rgb[0], rgb[1], rgb[2], alpha];
//   }
// }

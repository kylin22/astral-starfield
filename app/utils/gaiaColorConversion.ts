export const bprpToTeff = (bprp: number) => {
    return 5040/(0.4929+0.5092*bprp-0.0353*bprp**2);
} 

export const teffToRGB = (teff: number): [number, number, number] => {
    // range check
    const colourTemperature = Math.min(40000, Math.max(1000, teff));
    const tmpInternal = colourTemperature / 100.0;

    let red: number;
    let green: number;
    let blue: number;

    // red
    if (tmpInternal <= 66) {
        red = 255;
    } else {
        red = 329.698727446 * Math.pow(tmpInternal - 60, -0.1332047592);
    }

    // green
    if (tmpInternal <= 66) {
        green = 99.4708025861 * Math.log(tmpInternal) - 161.1195681661;
    } else {
        green = 288.1221695283 * Math.pow(tmpInternal - 60, -0.0755148492);
    }

    // blue
    if (tmpInternal >= 66) {
        blue = 255;
    } else if (tmpInternal <= 19) {
        blue = 0;
    } else {
        blue = 138.5177312231 * Math.log(tmpInternal - 10) - 305.0447927307;
    }
    
    const r = Math.min(1, Math.max(0, red / 255));
    const g = Math.min(1, Math.max(0, green / 255));
    const b = Math.min(1, Math.max(0, blue / 255));
    
    return [r, g, b];
}

export const teffToAlpha = (teff: number): number => {
    const colourTemperature = Math.min(40000, Math.max(1000, teff));
    const alphaRaw = Math.pow((colourTemperature - 1000) / (40000 - 1000), 0.5); 
    return Math.min(1, Math.max(0.2, alphaRaw));
}
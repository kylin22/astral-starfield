const bprpToTeff = (bprp: number) => {
    return 5040/(0.4929+0.5092*bprp-0.0353*bprp**2);
} 

export const bprpToRGB = (bprp: number): [number, number, number] => {
    // range check
    const teff = bprpToTeff(bprp);
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

    return [
        Math.min(255, Math.max(0, Math.round(red))),
        Math.min(255, Math.max(0, Math.round(green))),
        Math.min(255, Math.max(0, Math.round(blue))),
    ];
}
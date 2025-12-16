import chroma from "chroma-js";

function rgbToHex(color: [number, number, number] | null): string {
    if (color == null) {
        return "#ffffff"
    }
    return chroma(color[0], color[1], color[2]).hex()
}


const hexToRGB = (value: string): [number, number, number] => {
    return chroma(value).rgb()
}

function rgbToHSL(rgb: [number, number, number]): [number, number, number] {
    const [r, g, b] = rgb
    const [h, s, l] = chroma(r, g, b).hsl()
    // Hue is NaN for achromatic colors (grayscale), default to 0
    return [Math.round(h || 0), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToCmyk([red, green, blue]: [number, number, number]): [number, number, number, number] {
    const cmyk1 = chroma(red, green, blue).cmyk()
    return [
        Math.round(cmyk1[0] * 100),
        Math.round(cmyk1[1] * 100),
        Math.round(cmyk1[2] * 100),
        Math.round(cmyk1[3] * 100),
    ]
}

export {
    rgbToHex,
    hexToRGB,
    rgbToHSL,
    rgbToCmyk,
}

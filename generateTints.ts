import chroma from "chroma-js";

function generateTints(hex: string): string[] {
    const baseColor = chroma(hex);
    const shades: chroma.Color[] = [];
    for (let i = 0; i < 10; i++) {
        const previousColor = shades[i - 1] ?? baseColor
        const shade = previousColor.brighten(i * 0.1);
        shades.push(shade);
    }
    return shades.map(it => it.hex());
}

export default generateTints

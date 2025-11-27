import chroma from 'chroma-js';

function generateShades(color: string): string[] {
    const baseColor = chroma(color);
    const shades: chroma.Color[] = [];
    for (let i = 0; i < 10; i++) {
        const previousColor = shades[i - 1] ?? baseColor
        const shade = previousColor.darken(i * 0.1);
        shades.push(shade);
    }
    return shades.map(it => it.hex());
}

export default generateShades

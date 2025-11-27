import chroma from 'chroma-js';

/**
 * This function first converts the input color to a chroma.Color object using the chroma() function. It then calculates three triadic colors by rotating the hue of the input color by +/- 120 degrees using the set() method. The % 360 and + 360 operations ensure that the hue values stay within the range of 0 to 360 degrees. The original input color is included as one of the triadic colors to ensure that one color dominates and the others are used as accents.
 *
 * Finally, the function converts the triadic colors to hex color strings and returns them in an array. Note that the function returns an array of strings instead of a tuple, as there can be cases where the input color is not valid, and it can throw errors during the execution.
 * @param color
 */
function getTriadicColors(color: string): string[] {
    // Convert the input color to a chroma color object
    const chromaColor = chroma(color);

    // Calculate the analogous colors by rotating the hue by +/- 1/3 of the hue range from the input color
    const analogousColors = [
        chromaColor,
        chromaColor.set('hsl.h', (chromaColor.hsl()[0] + 120) % 360),
        chromaColor.set('hsl.h', (chromaColor.hsl()[0] - 120 + 360) % 360),
    ];

    // Set the saturation and luminance of the analogous colors to match the input color
    const baseSaturation = chromaColor.hsl()[1];
    const baseLuminance = chromaColor.hsl()[2];
    analogousColors.forEach(color => color.set('hsl.s', baseSaturation).set('hsl.l', baseLuminance));

    // Convert the analogous colors to hex color strings
    return analogousColors.map(color => color.hex());
}

export default getTriadicColors;

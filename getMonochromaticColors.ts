import chroma from "chroma-js";

/**
 * This function first converts the input color to a chroma color object. It then calculates a light and dark color by adjusting the luminance of the input color by +/-50%. It then creates a new color with the same hue as the input color, but with a luminance value halfway between the light and dark colors. Finally, it converts each of the three colors to a hex color string and returns them as an array. This should give you three colors that are subtle and refined, with the same hue and varying luminance values.
 * @param color
 */
function getMonochromaticColors(color: string): string[] {
    // Convert the input color to a chroma color object
    const chromaColor = chroma(color);

    // Calculate the light and dark colors by adjusting the luminance by +/-50% from the input color
    const lightColor = chromaColor.darken(chromaColor.get('hsl.l') * 6);
    const darkColor = chromaColor.darken(chromaColor.get('hsl.l') * 3);

    // Convert the colors to hex color strings
    return [chromaColor, lightColor, darkColor].map(color => color.hex());
}

export default getMonochromaticColors;

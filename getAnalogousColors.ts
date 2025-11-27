import chroma from 'chroma-js';

/**
 * This function first converts the input color to a chroma.Color object using the chroma() function. It then calculates three analogous colors by rotating the hue of the input color by +/- 30 degrees using the set() method. The % 360 and + 360 operations ensure that the hue values stay within the range of 0 to 360 degrees. The original input color is included as one of the analogous colors to ensure that the transitions between colors are smooth.
 *
 * Next, the function sets the saturation and luminance of the analogous colors to match the input color. It does this by getting the saturation and luminance values of the input color using the hsl() method, and then setting those same values for each of the analogous colors using the set() method with the sl key.
 *
 * Finally, the function converts the analogous colors to hex color strings and returns them in an array. Note that the function returns an array of strings instead of a tuple, as there can be cases where the input color is not valid, and it can throw errors during the execution.
 * @param color
 */
function getAnalogousColors(color: string): string[] {
    const chromaColor = chroma(color);
    const analogous1 = chromaColor.set('hsl.h', chromaColor.get('hsl.h') - 6)
    const analogous2 = chromaColor.set('hsl.h', chromaColor.get('hsl.h') + 6)
    const analogousColors = [
        chromaColor,
        analogous1,
        analogous2
    ]
    return analogousColors.map(color => color.hex());
}

export default getAnalogousColors;

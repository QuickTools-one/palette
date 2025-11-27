import chroma from 'chroma-js';

/**
 * This function uses the chroma() function to convert the input color string to a chroma.Color object, which has a set() method that can be used to modify its HSL (hue, saturation, lightness) values. The set() method takes two arguments: the property to modify (e.g., hsl.h for the hue value) and the new value to set. The hue value is rotated by 180 degrees using the modulo operator to ensure that it stays within the range of 0 to 360. The saturation value is set to 1 to ensure maximum saturation, and the lightness value is set to 0 to ensure minimum lightness (i.e., maximum darkness).
 *
 * Finally, the hex() method is used to convert the chroma.Color object to a hex color string, which is returned by the function.
 * @param color
 */
function getOppositeColor(color: string): string {
    // Convert hex color to a chroma.js color object
    const chromaColor = chroma(color);

    // Get the opposite color on the color wheel using the chroma.js `hsl` method
    const oppositeColor = chromaColor.set('hsl.h', (chromaColor.get('hsl.h') + 180) % 360);

    // Convert the opposite color back to hex format and return it
    return oppositeColor.hex();
}

export default getOppositeColor

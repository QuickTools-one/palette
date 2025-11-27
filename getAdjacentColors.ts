import chroma from 'chroma-js';
import getOppositeColor from "./getOppositeColor";

/**
 * This function first calculates the opposite color of the input color by rotating its hue by 180 degrees. It then calculates two adjacent colors to the opposite color by rotating its hue by +/- 30 degrees, using the set() method again. The % 360 and + 360 operations ensure that the hue values stay within the range of 0 to 360 degrees.
 *
 * Finally, the function converts the adjacent colors to hex color strings and returns them in an array. Note that the function returns an array of strings instead of a tuple, as there can be cases where the input color is not valid, and it can throw errors during the execution.
 * @param color
 */
function getAdjacentColors(color: string): string[] {
    const baseColor = chroma(color);
    const complement = chroma(getOppositeColor(color));
    const splitComplements = [
        baseColor.set('hsl.h', (complement.get('hsl.h') - 108) % 360),
        baseColor.set('hsl.h', (complement.get('hsl.h') + 36) % 360)
    ];
    return [baseColor.hex(), ...splitComplements.map(color => color.hex())];
}

export default getAdjacentColors;

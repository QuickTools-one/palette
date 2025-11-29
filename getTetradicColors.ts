import chroma from 'chroma-js';

/**
 * This function first converts the input color to a chroma color object. It then calculates the complement of the input color by rotating the hue by 180 degrees. It then calculates two additional colors by rotating the hue of the complement by +/-60 degrees. Finally, it converts each of the four colors to a hex color string and returns them as an array. This should give you two sets of complementary colors, with each set containing three colors separated by 60 degrees of hue.
 * @param color
 */
function getTetradicColors(color: string): string[] {
    // Convert the input color to a chroma color object
    const chromaColor = chroma(color);

    // Calculate the complement of the input color
    const complement = chromaColor.set('hsl.h', (chromaColor.hsl()[0] + 180) % 360);

    // Calculate two additional colors by rotating the hue of the complement by +/-60 degrees
    const firstSplitComplement = complement.set('hsl.h', (complement.hsl()[0] + 60) % 360);
    const secondSplitComplement = complement.set('hsl.h', (complement.hsl()[0] - 60 + 360) % 360);

    // Convert the colors to hex color strings (include the original color for tetradic = 4 colors)
    return [chromaColor.hex(), complement.hex(), firstSplitComplement.hex(), secondSplitComplement.hex()];
}

export default getTetradicColors;

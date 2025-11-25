declare module 'quantize' {
  type RGB = [number, number, number];
  
  interface ColorMap {
    palette(): RGB[];
    map(color: RGB): RGB;
    size(): number;
  }

  function quantize(
    pixels: RGB[],
    colorCount: number
  ): ColorMap | null;

  export default quantize;
}

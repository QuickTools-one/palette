import colorThief from './colorThief';
import {
  rgbToHex,
  hexToRGB,
  rgbToHSL,
  rgbToCmyk,
} from './converters';
import { ColorItem } from './ColorItem.type';

/**
 * Result containing both the dominant color and full palette
 */
export interface PaletteResult {
  /** The dominant (most prominent) color from the image */
  dominant: ColorItem;
  /** Array of colors in the palette */
  palette: ColorItem[];
}

/**
 * Extract a color palette from an image
 * @param image - HTML image element or image URL
 * @param colorCount - Number of colors to extract (2-20, default: 10)
 * @param quality - Quality vs speed trade-off (1 = best, 10 = default)
 * @returns Array of ColorItem objects with hex, rgb, hsl, and cmyk values
 */
export function getPalette(
  image: HTMLImageElement,
  colorCount: number = 10,
  quality: number = 10
): ColorItem[] {
  const palette: [number, number, number][] = colorThief.getPalette(image, colorCount, quality);
  
  if (!palette) {
    return [];
  }

  return palette.map(color => ({
    hex: rgbToHex(color),
    rgb: color,
    hsl: rgbToHSL(color),
    cmyk: rgbToCmyk(color),
  }));
}

/**
 * Get the dominant color from an image
 * @param image - HTML image element
 * @param quality - Quality vs speed trade-off (1 = best, 10 = default)
 * @returns ColorItem object with hex, rgb, hsl, and cmyk values
 */
export function getDominantColor(
  image: HTMLImageElement,
  quality: number = 10
): ColorItem {
  const color: [number, number, number] = colorThief.getColor(image, quality);
  
  return {
    hex: rgbToHex(color),
    rgb: color,
    hsl: rgbToHSL(color),
    cmyk: rgbToCmyk(color),
  };
}

/**
 * Get color palette from an image URL (async)
 * @param imageUrl - URL of the image
 * @param colorCount - Number of colors to extract (2-20, default: 10)
 * @param quality - Quality vs speed trade-off (1 = best, 10 = default)
 * @returns Promise that resolves to array of ColorItem objects
 */
export function getPaletteFromUrl(
  imageUrl: string,
  colorCount: number = 10,
  quality: number = 10
): Promise<ColorItem[]> {
  return new Promise((resolve, reject) => {
    colorThief.getPaletteFromUrl(
      imageUrl,
      (_dominant: any, palette: [number, number, number][]) => {
        if (!palette) {
          reject(new Error('Failed to extract palette from image'));
          return;
        }

        const colors = palette.map(color => ({
          hex: rgbToHex(color),
          rgb: color,
          hsl: rgbToHSL(color),
          cmyk: rgbToCmyk(color),
        }));
        
        resolve(colors);
      },
      colorCount,
      quality
    );
  });
}

/**
 * Get dominant color from an image URL (async)
 * @param imageUrl - URL of the image
 * @param quality - Quality vs speed trade-off (1 = best, 10 = default)
 * @returns Promise that resolves to ColorItem object
 */
export function getDominantColorFromUrl(
  imageUrl: string,
  quality: number = 10
): Promise<ColorItem> {
  return new Promise((resolve, reject) => {
    colorThief.getColorFromUrl(
      imageUrl,
      (color: [number, number, number]) => {
        if (!color) {
          reject(new Error('Failed to extract color from image'));
          return;
        }

        resolve({
          hex: rgbToHex(color),
          rgb: color,
          hsl: rgbToHSL(color),
          cmyk: rgbToCmyk(color),
        });
      },
      5,
      quality
    );
  });
}

/**
 * Get both the dominant color and full palette from an image in one operation
 * This is more efficient than calling getDominantColor and getPalette separately
 * @param image - HTML image element
 * @param colorCount - Number of colors to extract (2-20, default: 10)
 * @param quality - Quality vs speed trade-off (1 = best, 10 = default)
 * @returns Object containing both dominant color and palette
 */
export function getPaletteWithDominant(
  image: HTMLImageElement,
  colorCount: number = 10,
  quality: number = 10
): PaletteResult {
  const palette: [number, number, number][] = colorThief.getPalette(image, colorCount, quality);

  if (!palette || palette.length === 0) {
    return {
      dominant: {
        hex: '#000000',
        rgb: [0, 0, 0],
        hsl: [0, 0, 0],
        cmyk: [0, 0, 0, 100],
      },
      palette: [],
    };
  }

  const colors = palette.map(color => ({
    hex: rgbToHex(color),
    rgb: color,
    hsl: rgbToHSL(color),
    cmyk: rgbToCmyk(color),
  }));

  return {
    dominant: colors[0],
    palette: colors,
  };
}

/**
 * Get both the dominant color and full palette from an image URL in one operation (async)
 * This is more efficient than calling getDominantColorFromUrl and getPaletteFromUrl separately
 * @param imageUrl - URL of the image
 * @param colorCount - Number of colors to extract (2-20, default: 10)
 * @param quality - Quality vs speed trade-off (1 = best, 10 = default)
 * @returns Promise that resolves to object containing both dominant color and palette
 */
export function getPaletteWithDominantFromUrl(
  imageUrl: string,
  colorCount: number = 10,
  quality: number = 10
): Promise<PaletteResult> {
  return new Promise((resolve, reject) => {
    colorThief.getPaletteFromUrl(
      imageUrl,
      (_dominant: any, palette: [number, number, number][]) => {
        if (!palette || palette.length === 0) {
          reject(new Error('Failed to extract palette from image'));
          return;
        }

        const colors = palette.map(color => ({
          hex: rgbToHex(color),
          rgb: color,
          hsl: rgbToHSL(color),
          cmyk: rgbToCmyk(color),
        }));

        resolve({
          dominant: colors[0],
          palette: colors,
        });
      },
      colorCount,
      quality
    );
  });
}

// Export utility functions
export {
  rgbToHex,
  hexToRGB,
  rgbToHSL,
  rgbToCmyk,
};

// Export types
export type { ColorItem };

// Default export
export default {
  getPalette,
  getDominantColor,
  getPaletteFromUrl,
  getDominantColorFromUrl,
  getPaletteWithDominant,
  getPaletteWithDominantFromUrl,
  rgbToHex,
  hexToRGB,
  rgbToHSL,
  rgbToCmyk,
};

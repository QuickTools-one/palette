# @quicktoolsone/palette

Extract beautiful color palettes from images using advanced color quantization algorithms.

Developed and maintained by [QuickTools.one](https://quicktools.one) - A collection of fast, privacy-focused web tools.

## Installation

```bash
npm install @quicktoolsone/palette
```

## Features

- 🎨 Extract dominant colors from images
- 🌈 Generate full color palettes
- 🔄 Multiple color format support (HEX, RGB, HSL, CMYK)
- ⚡ Fast color quantization using median cut algorithm
- 🌐 Works with both image elements and URLs
- 📦 TypeScript support included

## Usage

### Basic Usage with Image Element

```typescript
import { getPalette, getDominantColor } from '@quicktoolsone/palette';

// Get the dominant color from an image
const imageElement = document.querySelector('img');
const dominantColor = getDominantColor(imageElement);
console.log(dominantColor.hex); // "#ff5733"

// Get a full color palette
const palette = getPalette(imageElement, 10); // Extract 10 colors
palette.forEach(color => {
  console.log(color.hex); // "#ff5733", "#33ff57", ...
});
```

### Using Image URLs

```typescript
import { getPaletteFromUrl, getDominantColorFromUrl } from '@quicktoolsone/palette';

// Get palette from image URL
const colors = await getPaletteFromUrl('https://example.com/image.jpg', 10);
console.log(colors);

// Get dominant color from URL
const dominant = await getDominantColorFromUrl('https://example.com/image.jpg');
console.log(dominant.hex);
```

### Get Palette and Dominant Color Together (Efficient)

```typescript
import { getPaletteWithDominant, getPaletteWithDominantFromUrl } from '@quicktoolsone/palette';

// Get both dominant color and palette in one call (more efficient)
const result = getPaletteWithDominant(imageElement, 10);
console.log(result.dominant.hex); // "#ff5733"
console.log(result.palette.length); // 10

// From URL (async)
const urlResult = await getPaletteWithDominantFromUrl('https://example.com/image.jpg', 10);
console.log(urlResult.dominant);
console.log(urlResult.palette);
```

### Color Conversion Utilities

```typescript
import { rgbToHex, rgbToHSL, rgbToCmyk, hexToRGB } from '@quicktoolsone/palette';

const rgb = [255, 87, 51];
const hex = rgbToHex(rgb); // "#ff5733"
const hsl = rgbToHSL(rgb); // [9, 100, 60]
const cmyk = rgbToCmyk(rgb); // [0, 66, 80, 0]

// Convert back
const rgbFromHex = hexToRGB('#ff5733'); // [255, 87, 51]
```

## API Reference

### `getPalette(image, colorCount?, quality?)`

Extracts a color palette from an image element.

**Parameters:**
- `image` (HTMLImageElement) - The image element to extract colors from
- `colorCount` (number, optional) - Number of colors to extract (2-20, default: 10)
- `quality` (number, optional) - Quality vs speed trade-off (1 = best quality, 10 = default, higher = faster)

**Returns:** `ColorItem[]`

### `getDominantColor(image, quality?)`

Gets the dominant color from an image element.

**Parameters:**
- `image` (HTMLImageElement) - The image element
- `quality` (number, optional) - Quality setting (default: 10)

**Returns:** `ColorItem`

### `getPaletteFromUrl(imageUrl, colorCount?, quality?)`

Extracts a color palette from an image URL (async).

**Parameters:**
- `imageUrl` (string) - URL of the image
- `colorCount` (number, optional) - Number of colors (default: 10)
- `quality` (number, optional) - Quality setting (default: 10)

**Returns:** `Promise<ColorItem[]>`

### `getDominantColorFromUrl(imageUrl, quality?)`

Gets the dominant color from an image URL (async).

**Parameters:**
- `imageUrl` (string) - URL of the image
- `quality` (number, optional) - Quality setting (default: 10)

**Returns:** `Promise<ColorItem>`

### `getPaletteWithDominant(image, colorCount?, quality?)`

Gets both the dominant color and full palette in one efficient operation.

**Parameters:**
- `image` (HTMLImageElement) - The image element
- `colorCount` (number, optional) - Number of colors (default: 10)
- `quality` (number, optional) - Quality setting (default: 10)

**Returns:** `PaletteResult`

### `getPaletteWithDominantFromUrl(imageUrl, colorCount?, quality?)`

Gets both the dominant color and full palette from a URL in one efficient operation (async).

**Parameters:**
- `imageUrl` (string) - URL of the image
- `colorCount` (number, optional) - Number of colors (default: 10)
- `quality` (number, optional) - Quality setting (default: 10)

**Returns:** `Promise<PaletteResult>`

### PaletteResult Type

```typescript
interface PaletteResult {
  dominant: ColorItem;  // The dominant (most prominent) color
  palette: ColorItem[]; // Array of all colors in the palette
}
```

### ColorItem Type

```typescript
type ColorItem = {
  name?: string | null;
  hex: string;                          // "#ff5733"
  rgb: [number, number, number];        // [255, 87, 51]
  hsl: [number, number, number];        // [9, 100, 60]
  cmyk: [number, number, number, number]; // [0, 66, 80, 0]
}
```

### Utility Functions

- `rgbToHex(rgb)` - Convert RGB to HEX
- `hexToRGB(hex)` - Convert HEX to RGB
- `rgbToHSL(rgb)` - Convert RGB to HSL
- `rgbToCmyk(rgb)` - Convert RGB to CMYK

## Quality vs Speed

The `quality` parameter controls the trade-off between accuracy and performance:

- `1` - Highest quality, slowest (samples every pixel)
- `10` - Default, good balance
- `20+` - Faster but may miss subtle colors

## Browser Support

This package requires a browser environment with:
- Canvas API support
- Image element support
- CORS-enabled images (when using URLs)

## Important Notes

### CORS Considerations

When loading images from URLs, ensure the image server supports CORS. The image must be served with appropriate CORS headers, or you'll encounter security errors.

```typescript
// Images must have CORS enabled
const img = document.createElement('img');
img.crossOrigin = 'anonymous';
img.src = 'https://example.com/image.jpg';
```

## About

This package is developed and maintained by **[QuickTools.one](https://quicktools.one)**, a platform providing fast, privacy-focused online tools for everyday tasks.

The package is actively used in production on [QuickTools.one](https://quicktools.one) to power color palette extraction features, helping thousands of users extract colors from images quickly and efficiently.

## Credits

This package is built on top of:
- [Color Thief](https://github.com/lokesh/color-thief) - Color quantization algorithm
- [chroma-js](https://github.com/gka/chroma.js) - Color conversions
- [quantize](https://github.com/olivierlesnicki/quantize) - Median cut algorithm

## License

MIT

import quantize from 'quantize';
import core from './core';

/*
 * Color Thief v2.3.2
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 * @license
 */

type RGB = [number, number, number];

/**
 * CanvasImage Class
 * Class that wraps the html image element and canvas.
 * It also simplifies some of the canvas context manipulation
 * with a set of helper functions.
 */
class CanvasImage {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(image: HTMLImageElement) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.width = this.canvas.width = image.naturalWidth;
    this.height = this.canvas.height = image.naturalHeight;
    this.context.drawImage(image, 0, 0, this.width, this.height);
  }

  getImageData(): ImageData {
    return this.context.getImageData(0, 0, this.width, this.height);
  }
}

/**
 * ColorThief Class
 * Main class for extracting color palettes from images
 */
class ColorThief {
  /**
   * getColor(sourceImage[, quality])
   * returns [r, g, b]
   *
   * Use the median cut algorithm provided by quantize.js to cluster similar
   * colors and return the base color from the largest cluster.
   *
   * Quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
   * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
   * faster a color will be returned but the greater the likelihood that it will not be the visually
   * most dominant color.
   */
  getColor(sourceImage: HTMLImageElement, quality: number = 10): RGB {
    const palette = this.getPalette(sourceImage, 5, quality);
    return palette[0];
  }

  /**
   * getPalette(sourceImage[, colorCount, quality])
   * returns array of [r, g, b] arrays
   *
   * Use the median cut algorithm provided by quantize.js to cluster similar colors.
   *
   * colorCount determines the size of the palette; the number of colors returned. If not set, it
   * defaults to 10.
   *
   * quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
   * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
   * faster the palette generation but the greater the likelihood that colors will be missed.
   */
  getPalette(
    sourceImage: HTMLImageElement,
    colorCount?: number,
    quality?: number
  ): RGB[] {
    const options = core.validateOptions({
      colorCount,
      quality
    });

    // Create custom CanvasImage object
    const image = new CanvasImage(sourceImage);
    if (image.width === 0) return [];
    const imageData = image.getImageData();
    const pixelCount = image.width * image.height;

    const pixelArray = core.createPixelArray(imageData.data, pixelCount, options.quality);

    // Send array to quantize function which clusters values
    // using median cut algorithm
    const cmap = quantize(pixelArray, options.colorCount);
    return cmap ? cmap.palette() : [];
  }

  /**
   * Get color from an image URL
   */
  getColorFromUrl(
    imageUrl: string,
    callback: (color: RGB, imageUrl: string) => void,
    quantity?: number,
    quality?: number
  ): void {
    const sourceImage = document.createElement("img");
    sourceImage.addEventListener('load', () => {
      const palette = this.getPalette(sourceImage, quantity ?? 5, quality);
      const dominantColor = palette[0];
      callback(dominantColor, imageUrl);
    });

    sourceImage.addEventListener('error', (error) => {
      console.log(error.target);
    });

    sourceImage.crossOrigin = "Anonymous";
    sourceImage.src = imageUrl;
  }

  /**
   * Get palette from an image URL
   */
  getPaletteFromUrl(
    imageUrl: string,
    callback: (dominantColor: RGB, palette: RGB[]) => void,
    quantity?: number,
    quality?: number
  ): void {
    const sourceImage = document.createElement("img");
    sourceImage.addEventListener('load', () => {
      const palette = this.getPalette(sourceImage, quantity ?? 5, quality);
      const dominantColor = palette[0];
      callback(dominantColor, palette);
    });

    sourceImage.addEventListener('error', (error) => {
      console.log(error.target);
    });

    sourceImage.crossOrigin = "Anonymous";
    sourceImage.src = imageUrl;
  }

  /**
   * Get image data from URL
   */
  getImageData(imageUrl: string, callback: (imageData: string) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      if (this.status === 200) {
        const uInt8Array = new Uint8Array(this.response);
        const binaryString = new Array(uInt8Array.length);
        for (let i = 0; i < uInt8Array.length; i++) {
          binaryString[i] = String.fromCharCode(uInt8Array[i]);
        }
        const data = binaryString.join('');
        const base64 = window.btoa(data);
        callback('data:image/png;base64,' + base64);
      }
    };
    xhr.send();
  }

  /**
   * Get color asynchronously from URL
   */
  getColorAsync(
    imageUrl: string,
    callback: (color: RGB, image: HTMLImageElement) => void,
    quality?: number
  ): void {
    const thief = new ColorThief();
    this.getImageData(imageUrl, function (imageData) {
      const sourceImage = document.createElement("img");
      sourceImage.crossOrigin = "Anonymous";
      sourceImage.addEventListener('load', function () {
        const palette = thief.getPalette(sourceImage, 5, quality);
        const dominantColor = palette[0];
        callback(dominantColor, sourceImage);
      });
      sourceImage.src = imageData;
    });
  }
}

const colorThief = new ColorThief();
export default colorThief;

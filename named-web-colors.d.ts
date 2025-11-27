declare module 'named-web-colors' {
  interface ColorOutput {
    name: string;
    hex: string;
    rgb: string;
    css: string;
    distance: number;
  }

  interface Options {
    list?: 'web' | 'werner';
    ignoreAlphaChannel?: boolean;
  }

  function getColorName(code: string, options?: Options): ColorOutput | undefined;
  export default getColorName;
}

import { describe, it, expect } from 'vitest';
import core from './core';
import generateShades from './generateShades';
import generateTints from './generateTints';
import generateTones from './generateTones';
import getAnalogousColors from './getAnalogousColors';
import getMonochromaticColors from './getMonochromaticColors';
import getTriadicColors from './getTriadicColors';
import getTetradicColors from './getTetradicColors';
import getAdjacentColors from './getAdjacentColors';

describe('validateOptions - colorCount', () => {
  // Test color counts from 1 to 20
  for (let i = 1; i <= 20; i++) {
    it(`should handle colorCount=${i}`, () => {
      if (i === 1) {
        // colorCount of 1 should throw an error
        expect(() => core.validateOptions({ colorCount: i })).toThrow();
      } else {
        const result = core.validateOptions({ colorCount: i });
        expect(result.colorCount).toBe(i);
      }
    });
  }

  it('should default to 10 when colorCount is undefined', () => {
    const result = core.validateOptions({});
    expect(result.colorCount).toBe(10);
  });

  it('should default to 10 when colorCount is not an integer', () => {
    const result = core.validateOptions({ colorCount: 5.5 });
    expect(result.colorCount).toBe(10);
  });

  it('should clamp colorCount below 2 to 2', () => {
    const result = core.validateOptions({ colorCount: 0 });
    expect(result.colorCount).toBe(2);
  });

  it('should clamp colorCount above 20 to 20', () => {
    const result = core.validateOptions({ colorCount: 25 });
    expect(result.colorCount).toBe(20);
  });

  // Additional edge cases
  it('should clamp negative colorCount to 2', () => {
    const result = core.validateOptions({ colorCount: -5 });
    expect(result.colorCount).toBe(2);
  });

  it('should clamp colorCount of 21 to 20', () => {
    const result = core.validateOptions({ colorCount: 21 });
    expect(result.colorCount).toBe(20);
  });

  it('should default to 10 for NaN', () => {
    const result = core.validateOptions({ colorCount: NaN });
    expect(result.colorCount).toBe(10);
  });

  it('should default to 10 for Infinity', () => {
    const result = core.validateOptions({ colorCount: Infinity });
    expect(result.colorCount).toBe(10);
  });

  it('should default to 10 for string passed as colorCount', () => {
    const result = core.validateOptions({ colorCount: "5" as any });
    expect(result.colorCount).toBe(10);
  });
});

describe('Color harmony utilities - color count', () => {
  const testColor = '#ff5733';

  it('generateShades should return 10 colors', () => {
    const result = generateShades(testColor);
    expect(result).toHaveLength(10);
  });

  it('generateTints should return 10 colors', () => {
    const result = generateTints(testColor);
    expect(result).toHaveLength(10);
  });

  it('generateTones should return 10 colors', () => {
    const result = generateTones(testColor);
    expect(result).toHaveLength(10);
  });

  it('getAnalogousColors should return 3 colors', () => {
    const result = getAnalogousColors(testColor);
    expect(result).toHaveLength(3);
  });

  it('getMonochromaticColors should return 3 colors', () => {
    const result = getMonochromaticColors(testColor);
    expect(result).toHaveLength(3);
  });

  it('getTriadicColors should return 3 colors', () => {
    const result = getTriadicColors(testColor);
    expect(result).toHaveLength(3);
  });

  it('getTetradicColors should return 4 colors', () => {
    const result = getTetradicColors(testColor);
    expect(result).toHaveLength(4);
  });

  it('getAdjacentColors should return 3 colors', () => {
    const result = getAdjacentColors(testColor);
    expect(result).toHaveLength(3);
  });
});

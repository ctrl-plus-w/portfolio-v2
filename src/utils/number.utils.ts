/**
 * Clamp the given value in the range [min, max]
 * @param value The value to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns A number
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

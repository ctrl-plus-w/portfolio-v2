/**
 * Linear interpolation function
 *
 * @see https://en.wikipedia.org/wiki/Linear_interpolation
 *
 * @param start The start value
 * @param end The end valuez
 * @param t The percentage
 * @returns A number
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

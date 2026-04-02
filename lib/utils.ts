import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates a nice set of Y-axis ticks based on the data provided.
 * Ensures small values (like 5.25) are clearly visible and large values are appropriately scaled.
 */
export const getSmartTicks = (data: { [key: string]: any }[], dataKey: string) => {
  if (!data || data.length === 0) return [0, 10, 20, 30, 40];

  const values = data.map((d) => parseFloat(d[dataKey]) || 0);
  const max = Math.max(...values);
  if (max === 0) return [0, 10, 20, 30, 40];

  // Find a nice step size
  // We want roughly 5 ticks
  const targetTicks = 5;
  const rawStep = max / (targetTicks - 1);

  // Handle cases where max is very small or very large
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const ratio = rawStep / magnitude;

  let step;
  if (ratio < 1.5) step = 1 * magnitude;
  else if (ratio < 3) step = 2 * magnitude;
  else if (ratio < 7) step = 5 * magnitude;
  else step = 10 * magnitude;

  const ticks = [];
  let currentTick = 0;

  // Add ticks until we cover the max value
  while (ticks.length === 0 || ticks[ticks.length - 1] < max) {
    ticks.push(Number(currentTick.toFixed(2)));
    currentTick += step;
  }

  // Ensure we have at least a few ticks for aesthetics
  while (ticks.length < 5) {
    ticks.push(Number(currentTick.toFixed(2)));
    currentTick += step;
  }

  return ticks;
};

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single className string
 * with Tailwind CSS class merging support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add any other utility functions your application needs

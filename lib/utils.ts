import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function converToPlainObject<T>(value: T): T {
  console.log(value);
  return JSON.parse(JSON.stringify(value));
}

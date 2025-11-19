import { maskObject } from "./object-traversal";
import { MaskingOptions } from "./types";

// The main export function for the package
export function createDataMasker(options: MaskingOptions) {
  // Return the masking function with the rules bound
  return (data: any): any => {
    return maskObject(data, options.rules);
  };
}

export * from './types';

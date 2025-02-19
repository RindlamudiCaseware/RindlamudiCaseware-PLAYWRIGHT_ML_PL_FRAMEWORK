// src/utils/featureVector.ts

import { ElementSignature } from '../types';
import { tagToWeight, computeElementWeight } from './enhancedElementWeight';

export function toFeatureVector(sig: ElementSignature, reference?: ElementSignature): number[] {
  const vector: number[] = [];
  // Base features
  vector.push(tagToWeight(sig.tagName));                        // Dimension 1
  vector.push(sig.id ? sig.id.length : 0);                          // Dimension 2
  vector.push(sig.classList ? sig.classList.length : 0);            // Dimension 3
  vector.push(sig.textTokens ? sig.textTokens.length : 0);          // Dimension 4
  if (sig.boundingBox) {
    vector.push(sig.boundingBox.width / sig.boundingBox.height);    // Dimension 5
  } else {
    vector.push(0);
  }
  // Include computed element weight
  vector.push(computeElementWeight(sig));                         // Dimension 6
  
  // Critical attributes match indicators if reference provided
  if (reference) {
    vector.push(sig.type && reference.type && sig.type.toLowerCase() === reference.type.toLowerCase() ? 1 : 0);            // Dimension 7: Type match
    vector.push(sig.placeholder && reference.placeholder &&
                sig.placeholder.toLowerCase() === reference.placeholder.toLowerCase() ? 1 : 0);                               // Dimension 8: Placeholder match
    vector.push(sig.role && reference.role && sig.role.toLowerCase() === reference.role.toLowerCase() ? 1 : 0);                // Dimension 9: Role match
    vector.push(sig.ariaLabel && reference.ariaLabel &&
                sig.ariaLabel.toLowerCase() === reference.ariaLabel.toLowerCase() ? 1 : 0);                                     // Dimension 10: ARIA label match
  } else {
    vector.push(sig.type ? sig.type.length : 0);
    vector.push(sig.placeholder ? sig.placeholder.length : 0);
    vector.push(sig.role ? sig.role.length : 0);
    vector.push(sig.ariaLabel ? sig.ariaLabel.length : 0);
  }
  
  return vector;
}

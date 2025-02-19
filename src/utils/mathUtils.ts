// src/utils/mathUtils.ts

import { ElementSignature } from '../types';
import { toFeatureVector } from './featureVector';
import { cosineSimilarity } from './cosineSimilarity';

/**
 * Compares two element signatures.
 * If both have a "type" and they differ, similarity is 0.
 * Otherwise, uses cosine similarity on the feature vectors.
 */
export function compareSignatures(a: ElementSignature, b: ElementSignature): number {
  if (a.type && b.type && a.type.toLowerCase() !== b.type.toLowerCase()) {
    return 0;
  }
  const aVec = toFeatureVector(a, b);
  const bVec = toFeatureVector(b, a);
  return cosineSimilarity(aVec, bVec);
}

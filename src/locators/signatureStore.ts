// src/locators/signatureStore.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ElementSignature } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const signaturesPath = path.join(__dirname, 'signatures.json');

let storedSignatures: ElementSignature[] = [];
if (fs.existsSync(signaturesPath)) {
  const raw = fs.readFileSync(signaturesPath, 'utf8');
  storedSignatures = JSON.parse(raw) as ElementSignature[];
}

export function getStoredSignature(selector: string): ElementSignature | null {
  return storedSignatures.find(sig => sig.originalSelector === selector) || null;
}

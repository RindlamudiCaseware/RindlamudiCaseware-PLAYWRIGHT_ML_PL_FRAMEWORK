import db from '../db/db';
import { ElementSignature } from '../types';
import { compareSignatures } from '../utils/mathUtils';
import { Logger } from '../utils/logger';

export class BaselineManager {
  /**
   * Loads baseline signatures from the in‑built database.
   */
  public async loadBaseline(): Promise<ElementSignature[]> {
    await db.read();
    const baseline = db.data?.baselineSignatures || [];
    Logger.info(`Loaded ${baseline.length} baseline signatures from DB.`);
    return baseline;
  }

  /**
   * Saves baseline signatures to the in‑built database.
   */
  public async saveBaseline(signatures: ElementSignature[]): Promise<void> {
    db.data!.baselineSignatures = signatures;
    await db.write();
    Logger.info(`Baseline signatures saved to DB.`);
  }

  /**
   * Compares current signatures with the baseline.
   * Returns an array of differences.
   */
  public async compareWithBaseline(current: ElementSignature[]): Promise<any[]> {
    const baseline = await this.loadBaseline();
    const differences: any[] = [];
    current.forEach(currentSig => {
      const baselineSig = baseline.find(sig => sig.originalSelector === currentSig.originalSelector);
      if (baselineSig) {
        const similarity = compareSignatures(baselineSig, currentSig);
        if (similarity < 0.9) { // threshold can be tuned
          differences.push({
            originalSelector: currentSig.originalSelector,
            similarity,
            baseline: baselineSig,
            current: currentSig
          });
        }
      } else {
        differences.push({
          originalSelector: currentSig.originalSelector,
          message: "New element not present in baseline",
          current: currentSig
        });
      }
    });
    if (differences.length > 0) {
      Logger.warn(`Baseline differences detected: ${JSON.stringify(differences, null, 2)}`);
    } else {
      Logger.info("No significant baseline differences detected.");
    }
    return differences;
  }
}

// src/utils/enhancedElementWeight.ts

import { ElementSignature } from '../types';

/**
 * Returns a numeric weight for a given ARIA role.
 */
export function roleToWeight(role: string): number {
  const r = role.toLowerCase();
  switch (r) {
    case 'button': return 2.5;
    case 'textbox': return 2;
    case 'checkbox': return 2;
    case 'radio': return 2;
    case 'radiogroup': return 2;
    case 'heading': return 2;
    case 'link': return 2;
    case 'img': return 2;
    case 'alert':
    case 'dialog':
    case 'alertdialog': return 2;
    case 'combobox': return 2;
    case 'listbox': return 1.8;
    case 'option': return 1.8;
    case 'switch': return 2;
    case 'slider': return 1.5;
    case 'tab':
    case 'tablist':
    case 'tabpanel': return 1.5;
    case 'menu':
    case 'menubar': return 1.5;
    case 'menuitem':
    case 'menuitemcheckbox':
    case 'menuitemradio': return 1.5;
    case 'table': return 1.5;
    case 'row':
    case 'rowgroup': return 1.2;
    case 'cell':
    case 'gridcell':
    case 'columnheader':
    case 'rowheader': return 1.2;
    case 'banner':
    case 'navigation':
    case 'main':
    case 'article':
    case 'region': return 1;
    default: return 1;
  }
}

/**
 * Returns a numeric weight for a given HTML tag.
 */
export function tagToWeight(tagName: string): number {
  const t = tagName.toLowerCase();
  switch (t) {
    case 'input':
    case 'select':
    case 'textarea': return 3;
    case 'button': return 2.5;
    case 'label': return 2;
    case 'a': return 2;
    case 'img': return 2;
    case 'table': return 2;
    case 'tr':
    case 'td':
    case 'th': return 1.5;
    case 'p':
    case 'li':
    case 'ul':
    case 'ol':
    case 'span':
    case 'div': return 1;
    default: return 1.5;
  }
}

/**
 * Computes an overall element weight by combining tag-based, role-based, type-based,
 * and other attribute hints.
 */
export function computeElementWeight(sig: ElementSignature): number {
  let weight = 0;
  weight += tagToWeight(sig.tagName);
  if (sig.role) {
    weight += roleToWeight(sig.role);
  }
  if (sig.type) {
    const lowerType = sig.type.toLowerCase();
    switch (lowerType) {
      case 'checkbox':
      case 'radio': weight += 2; break;
      case 'submit':
      case 'button': weight += 1.5; break;
      case 'password': weight += 1.5; break;
      default: weight += 0.5; break;
    }
  }
  if (sig.placeholder) { weight += 1; }
  if (sig.alt) { weight += 1; }
  if (sig.title) { weight += 0.5; }
  if (sig.dataTestId) { weight += 2; }
  if (sig.ariaLabel) { weight += 1; }
  const tokens = sig.textTokens ? sig.textTokens.length : 0;
  weight += Math.min(tokens, 10) * 0.1;
  if (sig.classList) { weight += sig.classList.length * 0.1; }
  return weight;
}

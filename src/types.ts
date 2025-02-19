export interface ElementSignature {
    originalSelector: string;
    tagName: string;
    id?: string | null;
    classList?: string[];
    textTokens?: string[];
    boundingBox?: { width: number; height: number };
    type?: string | null;
    placeholder?: string | null;
    alt?: string | null;
    title?: string | null;
    dataTestId?: string | null;
    ariaLabel?: string | null;
    role?: string | null;
    value?: string | null;
  }
  
  export interface LocatorDefinition {
    targetSelector: string;
    originalSelector: string;
  }
  
  export interface PageDefinition {
    pageUrl: string;
    locators: LocatorDefinition[];
    /**
     * Optional setup function for additional interactions (login, waiting, etc.)
     */
    setup?: (page: import('@playwright/test').Page) => Promise<void>;
  }
  
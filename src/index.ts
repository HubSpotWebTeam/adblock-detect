import { detect } from './lib/adblock';

declare global {
  interface Window {
    hs_hasAdBlocker: boolean;
  }
}

let hasAdBlocker = false;
window.hs_hasAdBlocker = hasAdBlocker;

export const checkAdblock = async(): Promise<boolean> => {
  hasAdBlocker = await detect();
  window.hs_hasAdBlocker = hasAdBlocker;

  return hasAdBlocker;
}
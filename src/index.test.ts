import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('checkAdblock', () => {
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('initialises window.hs_hasAdBlocker to false on import', async () => {
    await import('./index');

    expect(window.hs_hasAdBlocker).toBe(false);
  });

  it('sets window.hs_hasAdBlocker and returns the detection result', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('blocked')));
    const { checkAdblock } = await import('./index');

    vi.useFakeTimers();
    const promise = checkAdblock();
    await vi.advanceTimersByTimeAsync(1000);

    await expect(promise).resolves.toBe(true);
    expect(window.hs_hasAdBlocker).toBe(true);
  });
});

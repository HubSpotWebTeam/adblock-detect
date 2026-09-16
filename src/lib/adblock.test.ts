import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { detect, probeAdDomain, useScriptBait } from './adblock';

describe('probeAdDomain', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns false when the HEAD request succeeds', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null));
    vi.stubGlobal('fetch', fetchMock);

    await expect(probeAdDomain()).resolves.toBe(false);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://www3.doubleclick.net',
      expect.objectContaining({ method: 'HEAD', mode: 'no-cors' }),
    );
  });

  it('returns true when the request throws (domain blocked)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('blocked')));

    await expect(probeAdDomain()).resolves.toBe(true);
  });
});

describe('useScriptBait', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });
  afterEach(() => vi.useRealTimers());

  it('resolves false when the bait element is still present', async () => {
    const promise = useScriptBait();
    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBe(false);
  });

  it('resolves true when the bait element has been removed', async () => {
    const promise = useScriptBait();
    // Simulate an adblocker stripping the bait element out of the DOM.
    document.getElementById('hs-bait-notify')?.remove();
    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBe(true);
  });
});

describe('detect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('returns true when the domain probe detects a blocker', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('blocked')));

    const promise = detect();
    await vi.advanceTimersByTimeAsync(1000);

    await expect(promise).resolves.toBe(true);
  });

  it('returns false when neither strategy detects a blocker', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null)));

    const promise = detect();
    await vi.advanceTimersByTimeAsync(1000);

    await expect(promise).resolves.toBe(false);
  });
});

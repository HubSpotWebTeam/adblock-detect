/**
 * It does a HEAD call (as we don't need the response) to a commonly blocked domain by AdBlockers,
 * if the call fails it means that the user as an AdBlocker
 * @returns True if AdBlocker is detected, false otherwise
 */
export const probeAdDomain = async () => {
  let adblockDetected = false;
  const url = 'https://www3.doubleclick.net';
  try {
    await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
    });
  } catch {
    adblockDetected = true;
  }

  return adblockDetected;
};

/**
 * Create a bait dom element and checks if it's removed by an AdBlocker
 * @returns False if the element still exists, so no adBlocker exists, true if the element is gone
 */
export const useScriptBait = async (): Promise<boolean> => {
  const baitId = 'hs-bait-notify';
  const wrapper = document.createElement('div');
  wrapper.id = baitId;
  const bait = document.createElement('div');
  bait.classList.add('ads', 'ad', 'banner', 'ad-banner', 'ad-banner-top');
  bait.style.width = '1px';
  bait.style.height = '1px';
  wrapper.appendChild(bait);
  document.body.appendChild(wrapper);
  /**
   * @note: This is very crude, probably will not work as the adblocker doesn't have the time to execute it,
   * but it's just to give the general idea of how it should work
   */
  return new Promise((resolve) => {
    setTimeout(() => {
      const baitExists = document.getElementById(baitId);
      if (baitExists) {
        return resolve(false);
      }
      return resolve(true);
    }, 1000);
  });
};

/**
 * Checks the various strategies to detect an AdBlocker
 * @returns True if any strategy works
 */
export const detect = async () => {
  // Probing domain
  const hasDomainBlocker = await probeAdDomain();
  // Using bait
  const hasScriptBlocker = await useScriptBait();

  return hasDomainBlocker || hasScriptBlocker;
};


export type OS = 'apple' | 'linux' | 'windows';

export const detectOS = (): OS => {
  const userAgent = navigator.userAgent.toLowerCase();

  const userAgentData = (
    navigator as Navigator & {
      userAgentData?: { platform?: string };
    }
  ).userAgentData;

  const platform =
    userAgentData?.platform?.toLowerCase() || navigator.platform.toLowerCase();

  // Android user agents also contain "Linux", so check for Android first.
  if (userAgent.includes('android')) {
    return 'linux';
  }

  // iPadOS can identify itself as macOS while using touch input.
  if (
    /iphone|ipad|ipod|macintosh/.test(userAgent) ||
    /iphone|ipad|ipod|mac/.test(platform)
  ) {
    return 'apple';
  }

  if (userAgent.includes('linux') || platform.includes('linux')) {
    return 'linux';
  }

  if (userAgent.includes('windows') || platform.includes('win')) {
    return 'windows';
  }

  // uncommon or unrecognized platforms
  return 'windows';
};

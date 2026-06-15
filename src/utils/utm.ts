// Utility to track and retrieve utm_source parameter.

/**
 * Extracts utm_source from the URL.
 * Handles both standard query params (?utm_source=val) and hash query params (#path?utm_source=val).
 */
const extractUtmSourceFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    // 1. Try standard window.location.search
    const searchParams = new URLSearchParams(window.location.search);
    const searchSource = searchParams.get('utm_source');
    if (searchSource) return searchSource;

    // 2. Try parsing from hash parameters (e.g. #khao-sat-chuyen-doi-ai?utm_source=blog)
    const hash = window.location.hash;
    if (hash && hash.includes('?')) {
      const hashQueryString = hash.split('?')[1];
      if (hashQueryString) {
        const hashParams = new URLSearchParams(hashQueryString);
        const hashSource = hashParams.get('utm_source');
        if (hashSource) return hashSource;
      }
    }

    // 3. Fallback regex search on complete URL for any utm_source format
    const href = window.location.href;
    const match = href.match(/[?#&]utm_source=([^&]+)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
  } catch (e) {
    console.warn('Failed to parse UTM parameters from URL:', e);
  }

  return null;
};

// Run immediately on module loading to capture utm_source from URL if present
if (typeof window !== 'undefined') {
  try {
    const utmSource = extractUtmSourceFromUrl();
    if (utmSource) {
      sessionStorage.setItem('utm_source', utmSource);
    }
  } catch (e) {
    console.warn('Failed to store UTM parameters:', e);
  }
}

/**
 * Retrieves the current utm_source parameter.
 * Priority: URL query param (freshest) > Session storage (persisted only for the tab session) > 'organic' (default).
 */
export const getUtmSource = (): string => {
  if (typeof window !== 'undefined') {
    try {
      // 1. Try fresh URL param
      const urlSource = extractUtmSourceFromUrl();
      if (urlSource) {
        sessionStorage.setItem('utm_source', urlSource);
        return urlSource;
      }
      
      // 2. Try cached session storage
      const storedSessionSource = sessionStorage.getItem('utm_source');
      if (storedSessionSource) {
        return storedSessionSource;
      }
    } catch (e) {
      console.warn('Failed to retrieve UTM storage value:', e);
    }
  }
  return 'organic';
};


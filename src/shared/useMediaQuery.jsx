import { useState, useEffect } from 'react';

/**
 * useMediaQuery - React hook to listen for CSS media query changes.
 * @param {string} query - Media query string (e.g. '(max-width: 600px)')
 * @returns {boolean} - True if the media query matches, false otherwise.
 */

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', listener);
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
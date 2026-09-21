import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query from JavaScript.
 *
 * Used only where a breakpoint has to change BEHAVIOUR rather than appearance -
 * for example the carousel showing 4 cards on desktop but 1 on mobile, which is
 * a different number of DOM nodes, not just different CSS.
 *
 * Anything that is purely visual stays in CSS media queries; duplicating
 * breakpoints into JS is a maintenance cost and should be the exception.
 *
 * @param {string} query e.g. '(max-width: 767px)'
 * @returns {boolean} whether the query currently matches
 */
export function useMediaQuery(query) {
  // Lazy initialiser so the first render already has the correct value and we
  // avoid a layout flash from starting at `false`.
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Re-sync on mount in case the viewport changed between the lazy
    // initialiser running and this effect firing.
    setMatches(mediaQueryList.matches);

    const handleChange = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

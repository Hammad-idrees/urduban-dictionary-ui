import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to an element the first time it scrolls into view,
 * which triggers the fade-up transition defined by `.reveal` in global.css.
 *
 * Why IntersectionObserver instead of a scroll listener: the browser does the
 * intersection maths off the main thread, so there is no scroll-handler cost
 * and nothing to throttle.
 *
 * The observer disconnects after the first reveal - this is a one-shot entrance,
 * so leaving it attached would waste work for the rest of the session.
 *
 * @param {object}  options
 * @param {number}  options.threshold  fraction of the element that must be visible
 * @param {string}  options.rootMargin shrinks the viewport box; the negative bottom
 *                                     value delays the trigger until the element is
 *                                     properly on screen rather than just peeking in
 * @returns {React.RefObject} ref to spread onto the element you want revealed
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Guard for older browsers (and JSDOM in tests): without support, just show
    // the content rather than leaving it permanently invisible.
    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    // Cleanup covers the case where the component unmounts before it is ever seen.
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

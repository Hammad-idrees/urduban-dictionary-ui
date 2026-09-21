import { useEffect, useState } from 'react';
import './ScrollToTop.css';

/**
 * Floating "back to top" button, taken from the bottom-right of the design.
 *
 * It only appears once the user is far enough down the page for it to be
 * useful - showing it at the top would be a control that does nothing.
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Threshold is a viewport height rather than a fixed pixel count, so it
    // behaves the same on a phone as on a large monitor.
    const toggleVisibility = () => setIsVisible(window.scrollY > window.innerHeight * 0.6);

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Respect the OS-level reduced-motion setting: an unexpected smooth scroll
    // of several thousand pixels can be genuinely unpleasant for some users.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-top ${isVisible ? 'scroll-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      // Taken out of the tab order while hidden so keyboard users do not land
      // on an invisible control.
      tabIndex={isVisible ? 0 : -1}
    >
      {/*
        The chevron is inlined rather than loaded through <img> because Figma
        exported it baked onto an opaque blue square. Inline, the path can use
        currentColor, which lets the button sit on a translucent surface and
        stay legible over both the white page and the blue footer.
        The path data is the export's, unchanged.
      */}
      <svg
        className="scroll-top__icon"
        viewBox="0 0 50 50"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M15 31L25.531 19L35 31"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

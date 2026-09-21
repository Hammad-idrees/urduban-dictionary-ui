import { useEffect, useState } from 'react';
import './ReadingProgress.css';

/**
 * Thin bar showing how far down the page the reader has scrolled.
 *
 * The Figma design places a short grey bar directly beneath the hero. This
 * implements it as a live indicator and makes it sticky, so it stays useful
 * while reading instead of scrolling away after 8 pixels.
 *
 * Performance note: the scroll handler only ever calls setState with a number,
 * and React bails out of re-rendering when that number is unchanged. The work
 * per scroll event is two layout reads and a subtraction.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      // Total distance that can actually be scrolled.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;

      // Guard against divide-by-zero on pages shorter than the viewport.
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      // Clamped because iOS rubber-band scrolling reports values outside 0-100.
      setProgress(Math.min(100, Math.max(0, (scrolled / scrollable) * 100)));
    };

    updateProgress(); // set the initial value, e.g. on a restored scroll position

    // `passive` promises we will not preventDefault, letting the browser keep
    // scrolling on the compositor thread rather than waiting on this handler.
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="progress"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Inline style is correct here: the value is continuous data, not a
          design decision, so it cannot live in a stylesheet. */}
      <div className="progress__fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

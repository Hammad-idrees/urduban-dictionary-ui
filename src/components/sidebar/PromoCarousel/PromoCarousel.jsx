import { useEffect, useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import slideOne from '../../../assets/images/ad-email-automation-1.webp';
import slideTwo from '../../../assets/images/ad-email-automation-2.webp';
import slideThree from '../../../assets/images/ad-email-automation-3.webp';
import './PromoCarousel.css';

/**
 * Rotating sponsored placement in the sidebar.
 *
 * The headline is part of each creative, so no heading element is rendered -
 * that would duplicate the text on screen and read it twice to a screen
 * reader. The wording lives in each slide's alt text instead.
 */
const slides = [
  { src: slideOne, alt: 'Sponsored: want to automate your emails?' },
  { src: slideTwo, alt: 'Sponsored: automate your email with a smart assistant' },
  { src: slideThree, alt: 'Sponsored: automate your email to save time and stay organised' },
];

const ROTATE_MS = 3200;

export function PromoCarousel() {
  const [index, setIndex] = useState(0);
  // Set while the pointer is over the ad, while focus is inside it, or when
  // the viewer has explicitly paused it.
  const [isHeld, setIsHeld] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  // Honour the OS setting: auto-advancing content is exactly the kind of
  // motion "reduce motion" is asking us not to produce.
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const isPlaying = !isHeld && !isStopped && !prefersReducedMotion;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <aside
      className="promo"
      aria-label="Advertisement"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
      // focus/blur bubble via capture on the container, so tabbing into the
      // controls holds the rotation the same way hovering does.
      onFocusCapture={() => setIsHeld(true)}
      onBlurCapture={() => setIsHeld(false)}
    >
      <div className="promo__viewport">
        <ul
          className="promo__track list-reset"
          style={{ '--index': index }}
          /* While slides advance on their own, announcing each one would
             interrupt the user at random. The APG guidance is to keep the
             region silent until rotation stops. */
          aria-live={isPlaying ? 'off' : 'polite'}
        >
          {slides.map((slide, i) => (
            <li
              className="promo__slide"
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              // Slides hold only images, so hiding the inactive ones removes
              // nothing focusable from the tab order.
              aria-hidden={i !== index}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width="908"
                height="1362"
                // Only the first slide is part of the initial render; the rest
                // are fetched as the carousel reaches them.
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="promo__controls">
        <div className="promo__dots">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className={`promo__dot ${i === index ? 'promo__dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show advertisement ${i + 1} of ${slides.length}`}
              aria-current={i === index}
            />
          ))}
        </div>

        {/*
          WCAG 2.2.2 requires a way to pause content that moves or updates
          automatically. Hover and focus alone do not satisfy it, because a
          touch or keyboard user may never trigger either.
        */}
        <button
          type="button"
          className="promo__toggle"
          onClick={() => setIsStopped((stopped) => !stopped)}
          aria-label={isStopped ? 'Resume advertisement rotation' : 'Pause advertisement rotation'}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            {isStopped ? (
              <path d="M5 3l8 5-8 5z" fill="currentColor" />
            ) : (
              <g fill="currentColor">
                <rect x="4" y="3" width="3" height="10" rx="1" />
                <rect x="9" y="3" width="3" height="10" rx="1" />
              </g>
            )}
          </svg>
        </button>
      </div>

      {/* An <a>, not a <button>: this navigates to the advertiser. */}
      <a className="promo__cta" href="#promo">
        Try it for free
      </a>
    </aside>
  );
}

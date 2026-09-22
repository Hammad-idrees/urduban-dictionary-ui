import { useEffect, useState } from 'react';
import { WordCard } from '../WordCard/WordCard';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import prevIcon from '../../../assets/icons/carousel-prev.svg';
import nextIcon from '../../../assets/icons/carousel-next.svg';
import './CommonWordsCarousel.css';

/**
 * "Most Common Words" carousel.
 *
 * Paging model: cards are laid out in one long flex track and the track is
 * slid sideways by whole pages. Only the CSS transform changes, so the browser
 * never re-lays-out the cards and the animation stays on the compositor.
 *
 * @param {object} props
 * @param {Array}  props.phrases [{ english, urdu }]
 */
export function CommonWordsCarousel({ phrases }) {
  const revealRef = useScrollReveal();

  /*
    How many cards fit per page. This has to be JavaScript rather than pure CSS
    because the paging MATHS depends on it - the arrows need to know how many
    pages exist, which a media query cannot tell them.
  */
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const perView = isMobile ? 1 : isTablet ? 2 : 4;

  const [dismissedPhrases, setDismissedPhrases] = useState([]);
  const [page, setPage] = useState(0);

  // A new word brings a new phrase list, so previous dismissals no longer apply.
  useEffect(() => {
    setDismissedPhrases([]);
    setPage(0);
  }, [phrases]);

  const visiblePhrases = phrases.filter(
    (phrase) => !dismissedPhrases.includes(phrase.english),
  );

  const pageCount = Math.max(1, Math.ceil(visiblePhrases.length / perView));

  /*
    Dismissing cards or resizing to a wider breakpoint can leave `page` pointing
    past the end of the track, which would show empty space. Clamping in an
    effect keeps the index valid no matter which of the two caused it.
  */
  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  // Modulo wraps in both directions; adding pageCount first keeps it positive.
  const goToPrevious = () => setPage((current) => (current - 1 + pageCount) % pageCount);
  const goToNext = () => setPage((current) => (current + 1) % pageCount);

  const dismissPhrase = (english) =>
    setDismissedPhrases((current) => [...current, english]);

  const hasMultiplePages = pageCount > 1;

  return (
    <section
      className="carousel reveal"
      id="common-words"
      ref={revealRef}
      aria-labelledby="common-words-title"
    >
      <div className="carousel__header">
        <h2 className="carousel__title" id="common-words-title">
          Most Common Words:
        </h2>

        {/* Arrows are pointless with only one page, so they are hidden then. */}
        {hasMultiplePages && (
          <div className="carousel__controls">
            <button
              type="button"
              className="carousel__arrow"
              onClick={goToPrevious}
              aria-label="Previous phrases"
            >
              <img src={prevIcon} alt="" width="16" height="26" />
            </button>

            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              onClick={goToNext}
              aria-label="Next phrases"
            >
              <img src={nextIcon} alt="" width="16" height="26" />
            </button>
          </div>
        )}
      </div>

      {visiblePhrases.length === 0 ? (
        <p className="carousel__empty">
          You have dismissed every phrase. Search another word to see more.
        </p>
      ) : (
        /*
          aria-live tells a screen reader to announce the new cards after the
          arrows are used; "polite" waits for a pause rather than interrupting.
        */
        <div className="carousel__viewport" aria-live="polite">
          <ul
            className="carousel__track list-reset"
            style={{
              // Both values feed CSS calc() expressions in the stylesheet, which
              // keeps the layout maths in CSS and only the state here.
              '--per-view': perView,
              '--page': page,
            }}
          >
            {visiblePhrases.map((phrase) => (
              <li className="carousel__slide" key={phrase.english}>
                <WordCard
                  phrase={phrase}
                  onDismiss={() => dismissPhrase(phrase.english)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Page dots double as a position indicator and a jump target. */}
      {hasMultiplePages && (
        <div className="carousel__dots">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel__dot ${index === page ? 'carousel__dot--active' : ''}`}
              onClick={() => setPage(index)}
              aria-label={`Go to page ${index + 1} of ${pageCount}`}
              aria-current={index === page}
            />
          ))}
        </div>
      )}
    </section>
  );
}

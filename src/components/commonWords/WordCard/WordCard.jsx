import { Card } from '../../ui/Card/Card';
import crossIcon from '../../../assets/icons/cross.svg';
import './WordCard.css';

/**
 * A single common-phrase card: English at the top, Urdu at the bottom right,
 * a dismiss button, and the blue underline from the design.
 *
 * @param {object}   props
 * @param {object}   props.phrase    { english, urdu }
 * @param {Function} props.onDismiss removes this card from the carousel
 */
export function WordCard({ phrase, onDismiss }) {
  return (
    <Card className="word-card" isInteractive as="article">
      <button
        type="button"
        className="word-card__dismiss"
        onClick={onDismiss}
        aria-label={`Dismiss phrase: ${phrase.english}`}
      >
        <img src={crossIcon} alt="" width="15" height="15" />
      </button>

      <p className="word-card__english" lang="en">
        {phrase.english}
      </p>

      <p className="word-card__urdu urdu" lang="ur" dir="rtl">
        {phrase.urdu}
      </p>

      {/* Decorative accent bar from the design - no semantic meaning. */}
      <span className="word-card__underline" aria-hidden="true" />
    </Card>
  );
}

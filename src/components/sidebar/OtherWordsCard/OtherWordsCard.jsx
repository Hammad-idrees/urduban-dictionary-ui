import { Card } from '../../ui/Card/Card';
import './OtherWordsCard.css';

/**
 * "Other Words!" panel - related terms for the word currently on screen.
 *
 * Each entry is a real button. Clicking one runs a fresh search, which is what
 * makes the sidebar part of the app rather than decoration. Words with no
 * dictionary entry simply return a "not found" state, handled upstream.
 *
 * @param {object}   props
 * @param {string[]} props.words
 * @param {Function} props.onWordSelect called with the chosen word
 */
export function OtherWordsCard({ words, onWordSelect }) {
  return (
    <Card className="other-words">
      <h2 className="other-words__title">Other Words!</h2>

      <ul className="other-words__list list-reset">
        {words.map((word, index) => (
          // Index is part of the key because the design's word list can legally
          // contain duplicates; the word alone would not be unique.
          <li key={`${word}-${index}`}>
            <button
              type="button"
              className="other-words__item"
              onClick={() => onWordSelect(word)}
            >
              {word}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

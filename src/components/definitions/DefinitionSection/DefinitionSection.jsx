import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './DefinitionSection.css';

/**
 * One part-of-speech block: a heading, the English synonyms, and the Urdu
 * translations sitting opposite them.
 *
 * `isReversed` is driven by the language selector. When the user swaps
 * English -> Urdu round to Urdu -> English, the two columns trade places so the
 * language being translated FROM is always the one on the reading-start side.
 *
 * @param {object}   props
 * @param {string}   props.partOfSpeech e.g. "Verb"
 * @param {string}   props.word         the headword being defined
 * @param {string[]} props.english
 * @param {string[]} props.urdu
 * @param {boolean}  props.isReversed   put Urdu first
 */
export function DefinitionSection({ partOfSpeech, word, english, urdu, isReversed }) {
  const revealRef = useScrollReveal();

  // Joined here rather than in the data file so the separator stays a
  // presentation decision, and the arrays remain usable for other things.
  const englishText = english.join(', ');
  const urduText = urdu.join('، '); // Arabic-script comma (U+060C) + space

  const englishColumn = (
    <p className="definition__text" lang="en">
      {englishText}
    </p>
  );

  const urduColumn = (
    <p className="definition__text definition__text--urdu urdu" lang="ur" dir="rtl">
      {urduText}
    </p>
  );

  return (
    <article className="definition reveal" ref={revealRef}>
      <h3 className="definition__heading">
        {partOfSpeech}: <span className="definition__word">{word}</span>
      </h3>

      <div className="definition__columns">
        {/*
          Swapping the JSX order (rather than using CSS `order`) keeps the DOM
          order matching the visual order, so keyboard and screen-reader users
          encounter the columns in the same sequence a sighted user sees them.
        */}
        {isReversed ? urduColumn : englishColumn}
        {isReversed ? englishColumn : urduColumn}
      </div>
    </article>
  );
}

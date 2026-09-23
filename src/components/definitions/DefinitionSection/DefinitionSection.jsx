import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { useFlipSwap } from '../../../hooks/useFlipSwap';
import './DefinitionSection.css';

/**
 * One part-of-speech block: a heading, the English synonyms, and the Urdu
 * translations sitting opposite them.
 *
 * Each term is its own chip rather than one comma-joined string. The English
 * chips are buttons that start a fresh lookup, which turns a definition into a
 * route further into the dictionary instead of a dead end.
 *
 * The Urdu chips are deliberately NOT buttons. The dataset is keyed by English
 * headword, so an Urdu chip has nothing to look up - a control that always
 * failed would be worse than no control at all. They share the chip styling so
 * the two columns still read as a matched pair, but only the English ones carry
 * a hover state, because only they do anything.
 *
 * `isReversed` is driven by the language selector. When the user swaps
 * English -> Urdu round to Urdu -> English, the two columns trade places so the
 * language being translated FROM is always the one on the reading-start side.
 * Which column is clickable does not change with it: searchability follows the
 * data's key language, not the display order.
 *
 * @param {object}   props
 * @param {string}   props.partOfSpeech e.g. "Verb"
 * @param {string}   props.word         the headword being defined
 * @param {string[]} props.english
 * @param {string[]} props.urdu
 * @param {boolean}  props.isReversed   put Urdu first
 * @param {Function} props.onWordSelect called with the synonym that was clicked
 */
export function DefinitionSection({
  partOfSpeech,
  word,
  english,
  urdu,
  isReversed,
  onWordSelect,
  blockIndex = 0,
}) {
  const revealRef = useScrollReveal();

  /*
    Swapping the language direction reorders the two columns in the JSX, which
    would otherwise teleport them past each other. This measures where they
    were, puts them back there, and lets them glide to the new position.

    It is keyed on `isReversed` because that is the only thing that moves them.
  */
  const columnsRef = useFlipSwap(isReversed);

  const englishColumn = (
    <ul
      /*
        The key is load-bearing, even though these are not in a list.

        Without it React reconciles the two <ul>s by POSITION: on a swap it
        would keep both nodes where they are and rewrite their contents, which
        replaces every chip with a differently-keyed one and replays the whole
        entrance animation mid-glide. With a key it matches them by identity
        instead and MOVES the node, so the chips travel with their column
        untouched.
      */
      key="english"
      className="definition__chips list-reset"
      // Identifies the content for the FLIP hook, which measures where each
      // language was before the swap and where it landed after.
      data-flip-id="english"
      // `role` is restated because Safari drops list semantics from any <ul>
      // whose list-style is removed - which is exactly what .list-reset does.
      role="list"
      lang="en"
      aria-label={`English synonyms for ${word}`}
    >
      {english.map((synonym, index) => (
        // Index is in the key for the same reason as the related-words list: a
        // thesaurus entry can legally repeat a term, so the string alone is not
        // guaranteed unique.
        //
        // --chip-index feeds the stagger calculation in the stylesheet, so the
        // JSX only has to say WHERE each chip sits, not how long it waits.
        <li
          className="definition__chip-item"
          key={`${synonym}-${index}`}
          style={{ '--chip-index': index }}
        >
          <button
            type="button"
            className="definition__chip definition__chip--action"
            onClick={() => onWordSelect(synonym)}
          >
            {synonym}
          </button>
        </li>
      ))}
    </ul>
  );

  const urduColumn = (
    <ul
      key="urdu"
      className="definition__chips urdu list-reset"
      data-flip-id="urdu"
      role="list"
      lang="ur"
      dir="rtl"
      aria-label={`Urdu translations for ${word}`}
    >
      {urdu.map((translation, index) => (
        <li
          className="definition__chip-item"
          key={`${translation}-${index}`}
          style={{ '--chip-index': index }}
        >
          <span className="definition__chip definition__chip--urdu">{translation}</span>
        </li>
      ))}
    </ul>
  );

  return (
    // --block-index staggers this block's own entrance against its siblings, so
    // a new word arrives part of speech by part of speech rather than all at
    // once. The chip stagger inside is offset by the same amount.
    <article
      className="definition reveal"
      ref={revealRef}
      style={{ '--block-index': blockIndex }}
    >
      <h3 className="definition__heading">
        {partOfSpeech}: <span className="definition__word">{word}</span>
      </h3>

      <div className="definition__columns" ref={columnsRef}>
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

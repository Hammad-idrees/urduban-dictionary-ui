import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './ExampleSentences.css';

/**
 * Worked examples of the headword in a full sentence, English above Urdu.
 *
 * This block exists partly for content and partly for layout: the sidebar is
 * considerably taller than the definitions, which left a large dead area in
 * the article column on wide screens. Filling it with genuinely useful
 * material is better than padding or an arbitrary graphic.
 *
 * @param {object} props
 * @param {Array}  props.examples  [{ english, urdu }]
 * @param {string} props.word      headword, used only for the accessible label
 * @param {boolean} props.isReversed show Urdu first when translating ur -> en
 */
export function ExampleSentences({ examples, word, isReversed, blockIndex = 0 }) {
  const revealRef = useScrollReveal();

  // Nothing to show rather than an empty heading, if an entry has no examples.
  if (!examples?.length) return null;

  return (
    // The caller passes the number of definition blocks above, so this section
    // continues the same stagger rather than restarting it.
    <section
      className="examples reveal"
      id="examples"
      ref={revealRef}
      style={{ '--block-index': blockIndex }}
      aria-labelledby="examples-title"
    >
      <h3 className="examples__title" id="examples-title">
        Examples: <span className="examples__word">{word}</span>
      </h3>

      <ul className="examples__list list-reset">
        {examples.map((example) => {
          const english = (
            <p className="examples__english" lang="en">
              {example.english}
            </p>
          );

          const urdu = (
            <p className="examples__urdu urdu" lang="ur" dir="rtl">
              {example.urdu}
            </p>
          );

          return (
            // The English sentence is unique within an entry, so it is a stable
            // key without needing an index.
            <li className="examples__item" key={example.english}>
              {/* Swapping JSX order keeps the DOM order matching the visual
                  order, so keyboard and screen reader users meet the two
                  languages in the same sequence a sighted user does. */}
              {isReversed ? urdu : english}
              {isReversed ? english : urdu}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

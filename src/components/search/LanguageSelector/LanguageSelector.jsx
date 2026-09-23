import { useRef, useState } from 'react';
import { languages } from '../../../data/navigation';
import { useClickOutside } from '../../../hooks/useClickOutside';
import chevronIcon from '../../../assets/icons/chevron-down.svg';
import swapIcon from '../../../assets/icons/arrow-swap.svg';
import './LanguageSelector.css';

/**
 * The "English -> Urdu" bar.
 *
 * Controlled component: it renders whatever `source` and `target` it is given
 * and reports intent upward. Keeping the selected languages in the parent means
 * the definition list and this bar can never disagree about the direction.
 *
 * @param {object}   props
 * @param {string}   props.source   language code currently translating FROM
 * @param {string}   props.target   language code currently translating TO
 * @param {Function} props.onSelect (side, code) => void
 * @param {Function} props.onSwap   swaps source and target
 */
export function LanguageSelector({ source, target, onSelect, onSwap }) {
  // Which dropdown is open: 'source', 'target', or null for none.
  // A single value rather than two booleans makes "only one open at a time"
  // impossible to get wrong.
  const [openSide, setOpenSide] = useState(null);

  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpenSide(null), openSide !== null);

  const labelFor = (code) => languages.find((lang) => lang.code === code)?.label ?? code;

  /*
    0 while translating from the first listed language, 1 once it is the other.
    Derived from the current direction rather than counted on each click, so it
    cannot drift out of step with what the bar actually says - and it flips for
    a swap made from a dropdown just as it does for the button.

    The stylesheet turns it into a half turn, so the arrow physically rolls over
    whenever the direction reverses.
  */
  const swapTurn = source === languages[0].code ? 0 : 1;

  const handleSelect = (side, code) => {
    onSelect(side, code);
    setOpenSide(null);
  };

  /** Renders one side of the bar: a trigger button plus its dropdown. */
  const renderSide = (side, activeCode) => {
    const isOpen = openSide === side;
    const dropdownId = `language-options-${side}`;

    return (
      <div className="language__side">
        <button
          type="button"
          // Keeps the trigger visibly lit while its own menu is open, so the
          // dropdown always has a visible owner on the bar.
          className={`language__trigger ${isOpen ? 'language__trigger--open' : ''}`}
          aria-expanded={isOpen}
          aria-controls={dropdownId}
          aria-label={`Translate ${side === 'source' ? 'from' : 'to'}: ${labelFor(activeCode)}`}
          onClick={() => setOpenSide(isOpen ? null : side)}
        >
          {/*
            Keyed on the language code, so React discards the old label and
            mounts a new one whenever the value changes - which is what replays
            the arrival animation. Without the key React would reuse the span
            and only swap its text, with no animation at all.
          */}
          <span className="language__label" key={activeCode}>
            {labelFor(activeCode)}
          </span>
          <img
            className={`language__chevron ${isOpen ? 'language__chevron--open' : ''}`}
            src={chevronIcon}
            alt=""
            width="18"
            height="11"
          />
        </button>

        {/*
          The list stays mounted and is hidden with a class so it can animate
          open and closed. `role="listbox"` + `aria-selected` give a screen
          reader the same single-choice semantics a native <select> would.
        */}
        <ul
          id={dropdownId}
          className={`language__options list-reset ${isOpen ? 'language__options--open' : ''}`}
          role="listbox"
          aria-label={`Choose ${side} language`}
        >
          {languages.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === activeCode}>
              <button
                type="button"
                className={`language__option ${
                  lang.code === activeCode ? 'language__option--active' : ''
                }`}
                onClick={() => handleSelect(side, lang.code)}
                tabIndex={isOpen ? 0 : -1}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="language" ref={containerRef}>
      {renderSide('source', source)}

      <button
        type="button"
        className="language__swap"
        onClick={onSwap}
        aria-label={`Swap languages: ${labelFor(source)} and ${labelFor(target)}`}
      >
        <img
          src={swapIcon}
          alt=""
          width="18"
          height="18"
          style={{ '--swap-turn': swapTurn }}
        />
      </button>

      {renderSide('target', target)}
    </div>
  );
}

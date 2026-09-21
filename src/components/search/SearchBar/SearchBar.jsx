import { useEffect, useMemo, useRef, useState } from 'react';
import { searchEntries } from '../../../data/dictionary';
import { useClickOutside } from '../../../hooks/useClickOutside';
import searchIcon from '../../../assets/icons/search.svg';
import './SearchBar.css';

/**
 * Search field with a live suggestions list.
 *
 * Implements the combobox keyboard contract people expect:
 *   ArrowDown / ArrowUp  move the highlight (and wrap around the ends)
 *   Enter                commit the highlighted suggestion, or the raw text
 *   Escape               dismiss the list without changing the input
 *
 * @param {object}   props
 * @param {string}   props.activeWord the word currently being displayed
 * @param {Function} props.onSearch   called with the committed search term
 */
export function SearchBar({ activeWord, onSearch }) {
  const [term, setTerm] = useState(activeWord);
  const [isOpen, setIsOpen] = useState(false);
  // -1 means "nothing highlighted" - Enter then submits the raw input instead.
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  /*
    Suggestions are derived from `term`, not stored in their own state.
    Deriving avoids the classic bug where the list and the input drift out of
    sync; useMemo just stops the filter re-running on unrelated re-renders.
  */
  const suggestions = useMemo(() => searchEntries(term), [term]);

  /*
    When the word changes from OUTSIDE this component - clicking a related word
    or a phrase card - the input must catch up. Without this the field would
    still show whatever was last typed.
  */
  useEffect(() => {
    setTerm(activeWord);
  }, [activeWord]);

  /** Commits a search and closes the suggestion list. */
  const commit = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setTerm(trimmed);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSearch(trimmed);
    // Blur on mobile so the on-screen keyboard gets out of the way of results.
    inputRef.current?.blur();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // A highlighted suggestion wins over the literal input text.
    const chosen = highlightedIndex >= 0 ? suggestions[highlightedIndex]?.word : term;
    commit(chosen ?? term);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    // Arrow keys only mean anything while there is a list to move through.
    if (!isOpen || suggestions.length === 0) return;

    if (event.key === 'ArrowDown') {
      // preventDefault stops the caret jumping to the end of the input.
      event.preventDefault();
      // Modulo wraps past the last item back to the first.
      setHighlightedIndex((index) => (index + 1) % suggestions.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      // Adding length before the modulo keeps the result positive at index 0.
      setHighlightedIndex(
        (index) => (index - 1 + suggestions.length) % suggestions.length,
      );
    }
  };

  const showSuggestions = isOpen && suggestions.length > 0;

  return (
    <div className="search" ref={containerRef}>
      <form className="search__form" role="search" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="word-search">
          Search for a word
        </label>

        <input
          id="word-search"
          ref={inputRef}
          className="search__input"
          type="text"
          value={term}
          placeholder="Search a word..."
          autoComplete="off"
          // Combobox wiring so assistive tech announces the popup and highlight.
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={
            highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
          }
          onChange={(event) => {
            setTerm(event.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        <button type="submit" className="search__button" aria-label="Search">
          <img src={searchIcon} alt="" width="24" height="24" />
        </button>
      </form>

      {showSuggestions && (
        <ul id="search-suggestions" className="search__suggestions list-reset" role="listbox">
          {suggestions.map((entry, index) => (
            <li key={entry.id} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                id={`suggestion-${index}`}
                className={`search__suggestion ${
                  index === highlightedIndex ? 'search__suggestion--active' : ''
                }`}
                // onMouseDown, not onClick: mousedown fires before the input's
                // blur, so the list is still mounted when the handler runs.
                onMouseDown={() => commit(entry.word)}
                // Keeping mouse and keyboard highlight in sync avoids showing
                // two highlighted rows at once.
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className="search__suggestion-word">{entry.word}</span>
                <span className="search__suggestion-urdu urdu" lang="ur" dir="rtl">
                  {entry.urduWord}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { SearchPanel } from './components/search/SearchPanel/SearchPanel';
import { DefinitionSection } from './components/definitions/DefinitionSection/DefinitionSection';
import { DefinitionSkeleton } from './components/definitions/DefinitionSkeleton/DefinitionSkeleton';
import { ExampleSentences } from './components/definitions/ExampleSentences/ExampleSentences';
import { AppDownloadCard } from './components/sidebar/AppDownloadCard/AppDownloadCard';
import { PromoCarousel } from './components/sidebar/PromoCarousel/PromoCarousel';
import { OtherWordsCard } from './components/sidebar/OtherWordsCard/OtherWordsCard';
import { CommonWordsCarousel } from './components/commonWords/CommonWordsCarousel/CommonWordsCarousel';
import { ReadingProgress } from './components/ui/ReadingProgress/ReadingProgress';
import { ScrollToTop } from './components/ui/ScrollToTop/ScrollToTop';
import { dictionary, findEntry, DEFAULT_WORD_ID } from './data/dictionary';
import './App.css';

/**
 * Application shell and the single owner of page state.
 *
 * All shared state lives here rather than in a context or a store. With one
 * page and three consumers, context would add indirection without removing any
 * prop passing worth removing - this is the "lift state to the closest common
 * ancestor" rule applied literally.
 */
/**
 * Simulated network latency for a lookup.
 *
 * The data is local, so a search would otherwise resolve in the same tick and
 * the loading state would never be visible. Routing every lookup through an
 * async boundary now means replacing this timeout with a real fetch later is a
 * change to this one function, with no component or markup changes at all.
 */
const LOOKUP_DELAY_MS = 550;

export default function App() {
  const [activeWordId, setActiveWordId] = useState(DEFAULT_WORD_ID);
  const [isLoading, setIsLoading] = useState(false);
  // Holds the term the user searched for when nothing matched, so the UI can
  // say WHICH word was missing rather than a generic error.
  const [missingTerm, setMissingTerm] = useState(null);

  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ur');

  // Derived from the id, not stored separately - two sources of truth for the
  // same thing is how they drift apart.
  const entry = useMemo(
    () => dictionary.find((item) => item.id === activeWordId),
    [activeWordId],
  );

  // Holds the in-flight lookup so a newer search can cancel it.
  const lookupTimer = useRef(null);

  /** Looks up a term and either shows it or records it as missing. */
  const handleSearch = (term) => {
    // Without this, clicking three related words quickly would leave three
    // timers running and the last one to fire would win, which is not
    // necessarily the last one the user asked for.
    clearTimeout(lookupTimer.current);
    setIsLoading(true);

    lookupTimer.current = setTimeout(() => {
      const match = findEntry(term);

      if (match) {
        setActiveWordId(match.id);
        setMissingTerm(null);
      } else {
        setMissingTerm(term);
      }

      setIsLoading(false);
    }, LOOKUP_DELAY_MS);
  };

  // Cancels a pending lookup if the app unmounts mid-search, which would
  // otherwise call setState on an unmounted component.
  useEffect(() => () => clearTimeout(lookupTimer.current), []);

  /**
   * Changing one side of the selector to the language already on the other
   * side would leave a nonsensical "English -> English", so that case is
   * treated as a swap instead.
   */
  const handleSelectLanguage = (side, code) => {
    if (side === 'source') {
      if (code === targetLang) setTargetLang(sourceLang);
      setSourceLang(code);
    } else {
      if (code === sourceLang) setSourceLang(targetLang);
      setTargetLang(code);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  // When translating Urdu -> English, the Urdu column moves to the start side.
  const isReversed = sourceLang === 'ur';

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <SearchPanel
        activeWord={missingTerm ?? entry.word}
        onSearch={handleSearch}
        sourceLang={sourceLang}
        targetLang={targetLang}
        onSelectLanguage={handleSelectLanguage}
        onSwapLanguages={handleSwapLanguages}
      />

      <ReadingProgress />

      <main id="main-content">
        <div className="container layout">
          <div className="layout__main">
            {isLoading ? (
              <DefinitionSkeleton />
            ) : missingTerm ? (
              <div className="layout__empty">
                <h2 className="layout__empty-title">
                  No results for &ldquo;{missingTerm}&rdquo;
                </h2>
                <p className="layout__empty-text">
                  That word is not in the dictionary yet. Try one of these:
                </p>
                <ul className="layout__empty-list list-reset">
                  {dictionary.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="layout__empty-suggestion"
                        onClick={() => handleSearch(item.word)}
                      >
                        {item.word}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                {entry.definitions.map((definition) => (
                  <DefinitionSection
                    // Part of speech is unique within an entry, but the word is
                    // included so React discards the old block when the word
                    // changes instead of reusing it and skipping the reveal.
                    key={`${entry.id}-${definition.partOfSpeech}`}
                    partOfSpeech={definition.partOfSpeech}
                    word={entry.word}
                    english={definition.english}
                    urdu={definition.urdu}
                    isReversed={isReversed}
                  />
                ))}

                <ExampleSentences
                  key={`${entry.id}-examples`}
                  examples={entry.examples}
                  word={entry.word}
                  isReversed={isReversed}
                />
              </>
            )}
          </div>

          <aside className="layout__sidebar" aria-label="Related content">
            <AppDownloadCard />
            <PromoCarousel />
            <OtherWordsCard words={entry.relatedWords} onWordSelect={handleSearch} />
          </aside>
        </div>

        <div className="container">
          <CommonWordsCarousel phrases={entry.commonPhrases} />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

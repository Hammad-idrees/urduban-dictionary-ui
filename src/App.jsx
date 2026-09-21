import { useMemo, useState } from 'react';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { SearchPanel } from './components/search/SearchPanel/SearchPanel';
import { DefinitionSection } from './components/definitions/DefinitionSection/DefinitionSection';
import { AppDownloadCard } from './components/sidebar/AppDownloadCard/AppDownloadCard';
import { PromoAd } from './components/sidebar/PromoAd/PromoAd';
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
export default function App() {
  const [activeWordId, setActiveWordId] = useState(DEFAULT_WORD_ID);
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

  /** Looks up a term and either shows it or records it as missing. */
  const handleSearch = (term) => {
    const match = findEntry(term);

    if (match) {
      setActiveWordId(match.id);
      setMissingTerm(null);
    } else {
      setMissingTerm(term);
    }
  };

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
            {missingTerm ? (
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
              entry.definitions.map((definition) => (
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
              ))
            )}
          </div>

          <aside className="layout__sidebar" aria-label="Related content">
            <AppDownloadCard />
            <PromoAd />
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

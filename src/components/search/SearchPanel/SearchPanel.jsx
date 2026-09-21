import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { SearchBar } from '../SearchBar/SearchBar';
import adBanner from '../../../assets/images/ad-banner.webp';
import './SearchPanel.css';

/**
 * The blue hero band: language selector, search field, and the sponsor banner.
 *
 * Purely compositional - it owns no state of its own and simply forwards props
 * down to the two controls. Keeping it stateless means the whole search flow
 * can be reasoned about from one place (App.jsx) during the demo.
 */
export function SearchPanel({
  activeWord,
  onSearch,
  sourceLang,
  targetLang,
  onSelectLanguage,
  onSwapLanguages,
}) {
  return (
    <section className="search-panel" aria-label="Word search">
      <div className="container search-panel__inner">
        {/* Constrains the controls to the 1030px width used in the design. */}
        <div className="search-panel__controls">
          <LanguageSelector
            source={sourceLang}
            target={targetLang}
            onSelect={onSelectLanguage}
            onSwap={onSwapLanguages}
          />

          <SearchBar activeWord={activeWord} onSearch={onSearch} />
        </div>

        {/*
          Sponsored placement from the design. Marked as an <aside> with a label
          so screen-reader users can identify and skip it.
        */}
        <aside className="search-panel__ad" aria-label="Advertisement">
          {/* Intrinsic size, so the browser reserves the right box before the
              image loads and the hero does not jump. */}
          <img
            src={adBanner}
            alt="Sponsored: Zaban - learn Urdu the easy way, 10 minutes a day"
            width="1948"
            height="320"
          />
        </aside>
      </div>
    </section>
  );
}

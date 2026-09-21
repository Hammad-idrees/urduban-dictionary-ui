/**
 * Navigation and footer link data.
 *
 * Extracted from JSX so the same list can feed both the desktop nav and the
 * mobile drawer without being written twice - if a link is added, it appears
 * in both automatically.
 */

export const mainNavLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Dictionary', href: '#dictionary' },
  { label: 'Thesaurus', href: '#thesaurus' },
  { label: 'Synonyms', href: '#synonyms' },
  { label: 'Antonyms', href: '#antonyms' },
  { label: 'Quiz', href: '#quiz' },
];

export const footerLinkColumns = [
  {
    id: 'explore',
    // Screen-reader-only heading; the Figma design shows no visible column
    // titles, but a bare list of links inside <nav> needs a label.
    title: 'Explore',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Thesaurus', href: '#thesaurus' },
      { label: 'Dictionary', href: '#dictionary' },
      { label: 'Antonyms', href: '#antonyms' },
      { label: 'Word Of Day', href: '#word-of-day' },
      { label: 'Quiz', href: '#quiz' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About us', href: '#about' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Contact us', href: '#contact' },
    ],
  },
];

export const socialLinks = [
  { id: 'facebook', label: 'Urduban on Facebook', href: 'https://facebook.com' },
  { id: 'instagram', label: 'Urduban on Instagram', href: 'https://instagram.com' },
  { id: 'youtube', label: 'Urduban on YouTube', href: 'https://youtube.com' },
  { id: 'twitter', label: 'Urduban on Twitter', href: 'https://twitter.com' },
];

/**
 * Languages offered by the selector.
 * `dir` travels with the language so any component rendering this language's
 * text can set the correct text direction without a lookup table elsewhere.
 */
export const languages = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ur', label: 'Urdu', dir: 'rtl' },
];

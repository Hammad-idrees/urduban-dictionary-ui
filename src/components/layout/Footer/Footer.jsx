import { footerLinkColumns, socialLinks } from '../../../data/navigation';
import logo from '../../../assets/images/urduban-logo.png';
import facebookIcon from '../../../assets/icons/facebook.svg';
import instagramIcon from '../../../assets/icons/instagram.svg';
import youtubeIcon from '../../../assets/icons/youtube.svg';
import twitterIcon from '../../../assets/icons/twitter.svg';
/*
  The same official store artwork the sidebar's AppDownloadCard uses. The page
  previously carried two different treatments of one call to action - bare
  platform glyphs here, real badges there - which read as an oversight rather
  than a choice.
*/
import googlePlayBadge from '../../../assets/images/badge-google-play.png';
import appStoreBadge from '../../../assets/images/badge-app-store.svg';
import './Footer.css';

/**
 * Maps the social link ids from the data file to their imported assets.
 * Vite fingerprints asset imports at build time, so they cannot be built from
 * a template string like `/icons/${id}.svg` - the bundler would never see them.
 */
const socialIcons = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon,
  twitter: twitterIcon,
};

export function Footer() {
  // Rendered fresh each year rather than hardcoding "2018" as the design does,
  // so the notice cannot silently go stale.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* ---------- Brand column ---------- */}
        <div className="footer__brand">
          {/*
            The mark sits in a link for the same reason the header's does - a
            footer brand mark is a conventional way back to the top - and
            because the spotlight below is a hover effect: on a static <img> a
            keyboard user could never trigger it at all.
          */}
          <a className="footer__logo-link" href="#home" aria-label="Urduban home">
            {/*
              The lamp and its beam. Both are pure decoration - one is the
              light source, the other the cone it throws - so neither is
              exposed to assistive technology.
            */}
            <span className="footer__lamp" aria-hidden="true" />
            <span className="footer__beam" aria-hidden="true" />

            <img
              className="footer__logo"
              src={logo}
              alt="Urduban"
              width="208"
              height="54"
              loading="lazy"
            />
          </a>

          {/*
            Takes the place of the two copyright lines that moved down to the
            bottom bar. Without it this column is a logo and four icons, and
            sits visibly shorter than the two beside it. The wording is the
            site's own meta description from index.html, not new copy.
          */}
          <p className="footer__tagline">
            English to Urdu dictionary, thesaurus, synonyms and antonyms.
          </p>

          <ul className="footer__socials list-reset">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  className="footer__social-link"
                  href={social.href}
                  // noreferrer is paired with _blank to deny the opened page
                  // access to window.opener.
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <img src={socialIcons[social.id]} alt="" width="36" height="36" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Link columns ---------- */}
        {footerLinkColumns.map((column) => (
          <nav
            className="footer__column"
            key={column.id}
            /*
              Points at the visible heading instead of repeating its text in an
              aria-label, so the landmark's name and the heading can never drift
              apart. While the heading was screen-reader-only, aria-label was
              the only option.
            */
            aria-labelledby={`footer-${column.id}-title`}
          >
            {/*
              Now visible. These headings were the only thing distinguishing the
              two link groups, and hiding them meant the layout alone had to
              carry that job - which is exactly what broke when the columns
              collapsed on mobile.
            */}
            <h2 className="footer__column-title" id={`footer-${column.id}-title`}>
              {column.title}
            </h2>

            <ul className="footer__links list-reset">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a className="footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/*
              The app-download block sits at the bottom of the second column in
              the design, so it is rendered inside that column rather than being
              positioned over it.
            */}
            {column.id === 'company' && (
              <div className="footer__apps">
                <p className="footer__apps-title">Download Our Mobile App:</p>
                <div className="footer__apps-badges">
                  {/*
                    The badges are official store artwork that already reads
                    "Get it on Google Play", so the label names the destination
                    rather than repeating the image's own wording. The
                    width/height carry each badge's true intrinsic ratio.
                  */}
                  <a
                    className="footer__apps-badge"
                    href="#android"
                    aria-label="Download Urduban on Google Play"
                  >
                    <img src={googlePlayBadge} alt="" width="168" height="50" loading="lazy" />
                  </a>

                  <a
                    className="footer__apps-badge"
                    href="#ios"
                    aria-label="Download Urduban on the App Store"
                  >
                    <img src={appStoreBadge} alt="" width="150" height="50" loading="lazy" />
                  </a>
                </div>
              </div>
            )}
          </nav>
        ))}
      </div>

      {/*
        Bottom bar: the conventional home for a copyright notice, and it gives
        the footer a base to end on rather than three columns of ragged height.
      */}
      <div className="container footer__bottom">
        <p className="footer__copyright">
          {/* One sentence, not two - and the © symbol makes the word
              "Copyright" that the design carried redundant. */}
          &copy; {currentYear} Urduban. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

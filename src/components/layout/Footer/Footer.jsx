import { footerLinkColumns, socialLinks } from '../../../data/navigation';
import logo from '../../../assets/images/urduban-logo.png';
import facebookIcon from '../../../assets/icons/facebook.svg';
import instagramIcon from '../../../assets/icons/instagram.svg';
import youtubeIcon from '../../../assets/icons/youtube.svg';
import twitterIcon from '../../../assets/icons/twitter.svg';
import androidIcon from '../../../assets/icons/android.png';
import appleIcon from '../../../assets/icons/apple.png';
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

          <p className="footer__copyright">&copy; {currentYear} Copyright: Urduban</p>
          <p className="footer__copyright">All Rights Reserved.</p>

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
          <nav className="footer__column" key={column.id} aria-label={column.title}>
            <h2 className="visually-hidden">{column.title}</h2>
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
                <div className="footer__apps-icons">
                  <a href="#android" aria-label="Get Urduban on Google Play">
                    <img src={androidIcon} alt="" width="48" height="48" loading="lazy" />
                  </a>
                  <a href="#ios" aria-label="Get Urduban on the App Store">
                    <img src={appleIcon} alt="" width="42" height="48" loading="lazy" />
                  </a>
                </div>
              </div>
            )}
          </nav>
        ))}
      </div>
    </footer>
  );
}

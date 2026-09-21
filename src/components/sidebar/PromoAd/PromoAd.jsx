import promoImage from '../../../assets/images/ad-email-automation.png';
import './PromoAd.css';

/**
 * Sponsored placement in the sidebar: image, headline, and a yellow CTA.
 * Figma: 454px wide image, #f8b318 call-to-action bar.
 */
export function PromoAd() {
  return (
    <aside className="promo" aria-label="Advertisement">
      <div className="promo__media">
        <img
          src={promoImage}
          alt="A phone showing unread email notifications"
          width="454"
          height="569"
          loading="lazy"
        />
      </div>

      <h2 className="promo__headline">Want to automate your emails?</h2>

      {/*
        An <a> rather than a <button>: this navigates to the advertiser, and
        using the right element means it works with middle-click, "open in new
        tab", and is announced as a link.
      */}
      <a className="promo__cta" href="#promo">
        Try it for free
      </a>
    </aside>
  );
}

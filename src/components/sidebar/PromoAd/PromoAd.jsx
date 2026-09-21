import promoImage from '../../../assets/images/ad-email-automation.webp';
import './PromoAd.css';

/**
 * Sponsored placement in the sidebar: creative plus a yellow CTA.
 * Figma: 454px wide image, #f8b318 call-to-action bar.
 *
 * The headline is part of the ad creative itself, so it is NOT repeated as a
 * heading element - that would show the same sentence twice on screen and read
 * it out twice to a screen reader. The wording lives in the image's alt text
 * instead, which is the only copy assistive tech needs.
 */
export function PromoAd() {
  return (
    <aside className="promo" aria-label="Advertisement">
      <div className="promo__media">
        <img
          src={promoImage}
          alt="Sponsored: want to automate your emails?"
          width="908"
          height="1362"
          loading="lazy"
        />
      </div>

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

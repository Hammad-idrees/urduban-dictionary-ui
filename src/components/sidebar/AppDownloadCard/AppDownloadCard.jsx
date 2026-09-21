import { Card } from '../../ui/Card/Card';
import googlePlayBadge from '../../../assets/images/badge-google-play.png';
import appStoreBadge from '../../../assets/images/badge-app-store.png';
import './AppDownloadCard.css';

/**
 * Sidebar panel promoting the mobile apps.
 * Figma: 454x183 card with a 50px blue header strip and two store badges.
 */
export function AppDownloadCard() {
  return (
    <Card className="app-download" isInteractive>
      <h2 className="app-download__title">Download Our Mobile App!</h2>

      <div className="app-download__badges">
        {/*
          The badges are official store artwork that already contains the words
          "Get it on Google Play", so the alt text names the destination rather
          than repeating the image's own wording.
        */}
        <a className="app-download__badge" href="#android" aria-label="Download Urduban on Google Play">
          <img src={googlePlayBadge} alt="" width="190" height="50" loading="lazy" />
        </a>

        <a className="app-download__badge" href="#ios" aria-label="Download Urduban on the App Store">
          <img src={appStoreBadge} alt="" width="195" height="50" loading="lazy" />
        </a>
      </div>
    </Card>
  );
}

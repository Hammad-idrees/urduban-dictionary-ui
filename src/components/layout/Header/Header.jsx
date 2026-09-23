import { useEffect, useRef, useState } from 'react';
import { mainNavLinks } from '../../../data/navigation';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import logo from '../../../assets/images/urduban-logo.png';
import './Header.css';

/**
 * Site header: logo, primary navigation, and the mobile drawer.
 *
 * The drawer lives in this component rather than a separate <MobileNav> because
 * it renders the SAME link data driven by the SAME open/closed state. Splitting
 * it out would mean passing that state down through props for no real gain -
 * one component, one responsibility ("site navigation"), two presentations.
 */
export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleRef = useRef(null);

  const closeDrawer = () => setIsDrawerOpen(false);

  /*
    The drawer only exists below the nav breakpoint. Without this, opening it on
    a phone and then rotating to landscape - or dragging a desktop window back
    up past 900px - would leave the panel on screen and the body still scroll
    locked, with the hamburger that closes it already hidden by the media query.

    The 901px here is the inverse of the 900px breakpoint in Header.css; those
    two values are the one thing the stylesheet and this file must agree on.
  */
  const isDesktop = useMediaQuery('(min-width: 901px)');

  useEffect(() => {
    if (isDesktop) closeDrawer();
  }, [isDesktop]);

  /*
    The header and the hero band below it are the same blue, so a permanent drop
    shadow casts a dark smudge across the hero with no edge to justify it. The
    shadow only earns its place once there is content passing underneath.

    The handler only ever sets a boolean, and React bails out of re-rendering
    when that value is unchanged - so the work per scroll event is one property
    read and a comparison.
  */
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 0);

    updateScrolled(); // covers a restored scroll position on reload
    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  // While the drawer is open, stop the page behind it from scrolling.
  // Without this, scrolling over the overlay moves the document underneath.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isDrawerOpen);

    // Runs on unmount too, so the class can never be left stranded on <body>.
    return () => document.body.classList.remove('no-scroll');
  }, [isDrawerOpen]);

  /*
    Hands focus back to the hamburger when the drawer closes, so a keyboard user
    resumes at the control they used rather than being dropped at the top of the
    document.

    The ref guard matters: without it this would fire on the very first render,
    where the drawer is merely "not open yet" rather than "just closed", and
    steal focus from the page on load.
  */
  const hasOpened = useRef(false);

  useEffect(() => {
    if (isDrawerOpen) {
      hasOpened.current = true;
      return;
    }

    if (hasOpened.current) toggleRef.current?.focus();
  }, [isDrawerOpen]);

  /*
    Escape to dismiss, and a focus trap while open.

    Both live in one listener because they answer the same question - "what
    should this keypress do while the drawer has the screen?" - and two
    listeners on the same event would only be two things to keep in step.

    The trap matters because the page behind the drawer is still rendered and
    still focusable: without it, Tab walks off the last link and starts
    wandering the document underneath, invisible behind the backdrop.
  */
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDrawer();
        return;
      }

      if (event.key !== 'Tab') return;

      /*
        The toggle is listed FIRST and is part of the cycle even though it sits
        outside the panel: it is the button that closes the drawer, so shutting
        it out of the loop would trap a keyboard user with no way out but
        Escape. It is also where focus already is when the drawer opens, so the
        first Tab moves naturally into the links.
      */
      const focusable = [
        toggleRef.current,
        ...(drawerRef.current?.querySelectorAll('a[href]') ?? []),
      ].filter(Boolean);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Only the two ends need handling - everything between them is the
      // browser's own tab order, which is already correct.
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  return (
    <header
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      id="home"
    >
      <div className="container header__inner">
        <a className="header__logo" href="#home" aria-label="Urduban home">
          <img src={logo} alt="Urduban" width="208" height="54" />
        </a>

        {/* Desktop navigation - hidden below the tablet breakpoint in CSS. */}
        <nav className="header__nav" aria-label="Primary">
          <ul className="header__list list-reset">
            {mainNavLinks.map((link) => (
              <li key={link.label}>
                <a className="header__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/*
          aria-expanded tells a screen reader whether the drawer is currently
          open; aria-controls points at the element it operates.
        */}
        <button
          type="button"
          ref={toggleRef}
          className={`header__toggle ${isDrawerOpen ? 'header__toggle--open' : ''}`}
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-drawer"
          aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsDrawerOpen((open) => !open)}
        >
          {/* Three bars that animate into an X. Decorative, so hidden from AT. */}
          <span className="header__bar" aria-hidden="true" />
          <span className="header__bar" aria-hidden="true" />
          <span className="header__bar" aria-hidden="true" />
        </button>
      </div>

      {/* Backdrop: dims the page and gives a large tap target to dismiss. */}
      <div
        className={`header__backdrop ${isDrawerOpen ? 'header__backdrop--visible' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <nav
        id="mobile-drawer"
        ref={drawerRef}
        className={`header__drawer ${isDrawerOpen ? 'header__drawer--open' : ''}`}
        aria-label="Mobile"
        // Hiding the drawer from assistive tech when closed stops a screen
        // reader announcing links that are visually off-screen.
        aria-hidden={!isDrawerOpen}
      >
        <ul className="header__drawer-list list-reset">
          {mainNavLinks.map((link, index) => (
            // --drawer-index feeds the stagger in the stylesheet, so the links
            // arrive one after another behind the panel's own slide rather
            // than being fully formed the moment it starts moving.
            <li key={link.label} style={{ '--drawer-index': index }}>
              <a
                className="header__drawer-link"
                href={link.href}
                onClick={closeDrawer}
                // Removes closed links from the tab order entirely.
                tabIndex={isDrawerOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

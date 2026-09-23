import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * FLIP animation for elements that trade places.
 *
 * FLIP is First, Last, Invert, Play:
 *   First   remember where each element was on the previous render
 *   Last    read where it has just landed
 *   Invert  start it from where it was
 *   Play    animate it to where it now is
 *
 * The browser only ever lays the elements out once, in their final positions.
 * Everything the viewer sees is a compositor-only transform, so a swap of two
 * full-width columns animates without a single layout pass.
 *
 * The motion is deliberately not a straight line. Two elements sliding through
 * each other on the same axis read as a glitch - they overlap in the middle
 * with nothing to say which is which. Instead they BOW apart on the
 * perpendicular axis and one is scaled up to pass in front while the other
 * shrinks behind, so the eye can follow each one round the other. That is the
 * difference between "the layout changed" and "these two swapped places".
 *
 * Elements to track are marked with `data-flip-id`. The id identifies the
 * CONTENT, not the DOM node, so the hook can work out that "the English column
 * used to be on the left and is now on the right".
 *
 * @param {unknown} trigger value whose change means positions have swapped
 * @param {number}  duration how long the exchange takes
 * @returns {React.RefObject} ref for the element containing the tracked items
 */
export function useFlipSwap(trigger, duration = 500) {
  const containerRef = useRef(null);
  // Map of data-flip-id -> DOMRect from the previous render.
  const positions = useRef(new Map());

  /*
    useLayoutEffect, not useEffect: this has to run after the DOM is updated but
    BEFORE the browser paints. On useEffect the viewer would see one frame of
    the elements in their new places before the animation started - a visible
    flash of the end state.
  */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll('[data-flip-id]'));
    const previous = positions.current;
    const next = new Map();

    // Honour the OS setting - two columns arcing across the screen is exactly
    // the kind of motion this asks us not to produce.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    items.forEach((element) => {
      const id = element.dataset.flipId;
      const last = element.getBoundingClientRect();
      next.set(id, last);

      const first = previous.get(id);
      // Nothing to compare against on the first run, so nothing animates on
      // mount - which is what we want.
      if (!first || prefersReducedMotion) return;

      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (dx === 0 && dy === 0) return;

      // A second swap mid-flight should replace the first, not stack on it.
      // getAnimations() covers this element only, so the chips' own entrance
      // animations - which live on the <li> children - are untouched.
      element.getAnimations().forEach((animation) => animation.cancel());

      /*
        Side by side on desktop, stacked on mobile. The bow has to be
        perpendicular to whichever way the elements are actually travelling,
        so it is measured off the dominant axis rather than assumed.
      */
      const isHorizontal = Math.abs(dx) >= Math.abs(dy);
      const travel = isHorizontal ? dx : dy;

      /*
        The two elements travel in opposite directions, so keying off the sign
        of `travel` automatically sends one round the near side and the other
        round the far side - no need to know which element is which.
      */
      const passesInFront = travel > 0;

      // Scaled with distance so a short hop does not bow as far as a long one,
      // and capped so a very wide viewport does not throw them off course.
      const bow =
        Math.min(Math.abs(travel) * 0.14, 44) * (passesInFront ? -1 : 1);

      const midX = dx / 2 + (isHorizontal ? 0 : bow);
      const midY = dy / 2 + (isHorizontal ? bow : 0);
      // The one passing in front grows slightly, the one behind recedes. Depth
      // is what stops the overlap in the middle reading as a collision.
      const midScale = passesInFront ? 1.04 : 0.96;

      /*
        Grid and flex items honour z-index without needing `position`, which is
        why this can be set on the column directly. Cleared when the animation
        finishes so the stylesheet is back in sole charge.
      */
      element.style.zIndex = passesInFront ? '2' : '1';

      const animation = element.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(1)` },
          {
            transform: `translate(${midX}px, ${midY}px) scale(${midScale})`,
            offset: 0.5,
          },
          { transform: 'translate(0px, 0px) scale(1)' },
        ],
        {
          duration,
          // Symmetric easing: an exchange should accelerate and decelerate
          // evenly, unlike an entrance, which only decelerates.
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          // The last keyframe is the element's natural state, so nothing needs
          // to persist afterwards.
          fill: 'none',
        },
      );

      animation.finished
        .then(() => {
          element.style.zIndex = '';
        })
        // A cancelled animation rejects; that is expected, not an error.
        .catch(() => {});
    });

    positions.current = next;
  }, [trigger, duration]);

  /*
    A resize moves everything, which would leave the stored rectangles pointing
    at where things used to be - and the next swap would animate from a stale
    position. Clearing them means that one swap simply does not animate, which
    is a far better failure than a wrong animation.
  */
  useEffect(() => {
    const handleResize = () => positions.current.clear();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return containerRef;
}

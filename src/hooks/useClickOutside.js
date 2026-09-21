import { useEffect } from 'react';

/**
 * Calls `handler` when a click or focus lands outside `ref`.
 * Used to dismiss the language dropdown and the search suggestions list.
 *
 * Two details that are easy to get wrong:
 *
 * 1. The listener is attached on `pointerdown`, not `click`. A `click` only
 *    fires after mouseup, so a user who presses down outside and releases
 *    inside would not dismiss the menu.
 *
 * 2. `focusin` is included as well so that tabbing away from the dropdown
 *    closes it - keyboard users never generate a pointer event.
 *
 * @param {React.RefObject} ref      element treated as "inside"
 * @param {Function}        handler  called when the interaction is outside
 * @param {boolean}         enabled  skip attaching listeners while closed
 */
export function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      const element = ref.current;
      // `contains` also returns true for the element itself, which is what we want.
      if (!element || element.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener('pointerdown', listener);
    document.addEventListener('focusin', listener);

    return () => {
      document.removeEventListener('pointerdown', listener);
      document.removeEventListener('focusin', listener);
    };
  }, [ref, handler, enabled]);
}

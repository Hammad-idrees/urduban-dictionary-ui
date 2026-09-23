import { Skeleton } from '../../ui/Skeleton/Skeleton';
import './DefinitionSkeleton.css';

/**
 * Placeholder shown while a lookup is in flight.
 *
 * Deliberately mirrors the real DefinitionSection geometry (heading, then two
 * columns of chips) so the content does not visibly reflow when it arrives. A
 * generic spinner would not reserve the right space.
 */

// Varying widths read as words of different lengths. Uniform pills would look
// like a progress meter rather than loading content.
const chipWidths = ['84px', '62px', '104px', '72px', '92px', '58px', '110px'];

/*
  One line box of body text plus the chip's vertical padding and its two 1px
  borders - the exact expression .definition__chip resolves to. Built from the
  same tokens rather than a measured rem value, so it keeps matching as the
  fluid body size scales down on smaller viewports.
*/
const CHIP_HEIGHT =
  'calc(var(--fs-body) * var(--lh-body) + var(--space-2xs) * 2 + 2px)';

export function DefinitionSkeleton({ blocks = 3 }) {
  return (
    // role="status" announces once, politely, rather than each bar announcing.
    <div className="definition-skeleton" role="status">
      <span className="visually-hidden">Loading definitions</span>

      {Array.from({ length: blocks }, (_, blockIndex) => (
        <div className="definition-skeleton__block" key={blockIndex}>
          <Skeleton className="definition-skeleton__heading" width="42%" height="2.25rem" />

          <div className="definition-skeleton__columns">
            {/* Two columns, matching the English / Urdu split. */}
            {[0, 1].map((column) => (
              <div className="definition-skeleton__chips" key={column}>
                {chipWidths.map((width, chip) => (
                  <Skeleton
                    key={chip}
                    width={width}
                    height={CHIP_HEIGHT}
                    // Matches the pill shape of a real chip, so the two have the
                    // same silhouette and nothing jumps on the swap.
                    radius="var(--radius-pill)"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

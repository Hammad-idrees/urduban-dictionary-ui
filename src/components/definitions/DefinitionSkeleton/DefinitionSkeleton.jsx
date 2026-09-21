import { Skeleton } from '../../ui/Skeleton/Skeleton';
import './DefinitionSkeleton.css';

/**
 * Placeholder shown while a lookup is in flight.
 *
 * Deliberately mirrors the real DefinitionSection geometry (heading, then two
 * columns of body text) so the content does not visibly reflow when it
 * arrives. A generic spinner would not reserve the right space.
 */

// Varying line widths read as text. Uniform bars look like a loading bar.
const lineWidths = ['96%', '88%', '62%'];

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
              <div className="definition-skeleton__lines" key={column}>
                {lineWidths.map((width, line) => (
                  <Skeleton key={line} width={width} height="0.85rem" />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

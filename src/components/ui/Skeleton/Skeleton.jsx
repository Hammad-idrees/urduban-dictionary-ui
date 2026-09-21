import './Skeleton.css';

/**
 * A single shimmering placeholder bar.
 *
 * Purely decorative, so it is hidden from assistive technology. The component
 * that composes these is responsible for announcing the loading state once,
 * rather than every bar announcing itself.
 *
 * @param {object} props
 * @param {string} props.width  any CSS length, defaults to filling the parent
 * @param {string} props.height any CSS length
 * @param {string} props.radius overrides the default corner rounding
 */
export function Skeleton({ width = '100%', height = '1rem', radius, className = '' }) {
  return (
    <span
      className={`skeleton ${className}`.trim()}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

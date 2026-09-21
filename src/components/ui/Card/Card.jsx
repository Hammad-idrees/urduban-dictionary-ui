import './Card.css';

/**
 * The white elevated surface used by every sidebar panel and word card.
 *
 * Worth extracting because three separate components need the identical
 * background, radius, shadow and hover lift - without this they would each
 * redeclare the same four properties and drift apart over time.
 *
 * @param {object}    props
 * @param {string}    props.className extra BEM classes from the parent
 * @param {boolean}   props.isInteractive adds the hover lift
 * @param {React.ElementType} props.as   underlying element (defaults to div)
 */
export function Card({ children, className = '', isInteractive = false, as: Tag = 'div', ...rest }) {
  const classes = ['card', isInteractive && 'card--interactive', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

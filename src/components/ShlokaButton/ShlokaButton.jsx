import { forwardRef } from 'react';
import styles from './ShlokaButton.module.css';

/**
 * SHLOKA — Premium Handcrafted Button Component
 *
 * Variants:
 *   primary   — Ivory textile capsule CTA (e.g. "EXPLORE COLLECTION →")
 *   secondary — Understated outline capsule (e.g. "LEARN OUR STORY →")
 *   text      — Editorial underline + arrow (e.g. "VIEW JOURNAL →")
 *   icon      — Circular ivory textile icon button (Search/Account/Bag)
 *   disabled  — Desaturated, non-interactive
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'text'|'icon'|'disabled'} props.variant
 * @param {string} [props.href] — If provided, renders <a>, otherwise <button>
 * @param {React.ReactNode} [props.children] — Button label text
 * @param {React.ReactNode} [props.iconContent] — SVG icon for icon variant
 * @param {boolean} [props.showArrow=true] — Show arrow on primary/secondary/text
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] — Additional className
 * @param {string} [props.ariaLabel]
 * @param {string} [props.id]
 */
const ShlokaButton = forwardRef(function ShlokaButton(
  {
    variant = 'primary',
    href,
    children,
    iconContent,
    showArrow = true,
    disabled = false,
    className = '',
    ariaLabel,
    id,
    ...rest
  },
  ref
) {
  // Resolve the effective variant
  const effectiveVariant = disabled ? 'disabled' : variant;

  // Build class list
  const classList = [
    styles.btn,
    styles[effectiveVariant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Determine whether we show the arrow
  const hasArrow =
    showArrow &&
    !disabled &&
    (effectiveVariant === 'primary' ||
      effectiveVariant === 'secondary' ||
      effectiveVariant === 'text');

  // Build inner content
  const content =
    effectiveVariant === 'icon' ? (
      // Icon variant — render the SVG icon
      <span className={styles.iconSvg}>{iconContent}</span>
    ) : (
      // All other variants — label + optional arrow
      <>
        <span className={styles.label}>{children}</span>
        {hasArrow && <span className={styles.arrow}>→</span>}
      </>
    );

  // Render as <a> or <button>
  if (href && !disabled) {
    return (
      <a
        ref={ref}
        href={href}
        className={classList}
        aria-label={ariaLabel}
        id={id}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={classList}
      disabled={disabled}
      aria-label={ariaLabel}
      id={id}
      type="button"
      {...rest}
    >
      {content}
    </button>
  );
});

export default ShlokaButton;

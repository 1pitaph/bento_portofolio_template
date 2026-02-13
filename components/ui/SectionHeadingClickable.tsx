/**
 * Animated section heading with a black underline wipe effect on hover.
 *
 * On hover a full-width black bar slides in from the left, and the text
 * colour transitions to white, creating an inverse highlight. Typically used
 * as the clickable trigger that expands a section into an `ExpandedOverlay`.
 *
 * @prop children - Heading text content.
 * @prop onClick  - Optional callback fired when the heading is clicked.
 */
type SectionHeadingProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function SectionHeadingClickable({
  children,
  onClick,
}: SectionHeadingProps) {
  return (
    <h3
      onClick={onClick}
      className="group relative inline-block cursor-pointer overflow-hidden py-1 heading-section transition-all duration-300 ease-out hover:scale-105"
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="heading-section-sm relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </h3>
  );
}

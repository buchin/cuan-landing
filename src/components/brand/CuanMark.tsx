import { cn } from '../../lib/utils'

// Kepeng: an outer rim, circular coin and square opening. Uses the theme foreground.
export function CuanMark({
  className,
  decorative = false,
}: {
  className?: string
  decorative?: boolean
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : 'Cuan logo — kepeng coin'}
      className={cn('shrink-0 text-foreground', className)}
    >
      <circle
        cx="32"
        cy="32"
        r="27.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
      />
      <path
        fillRule="evenodd"
        d="M56 32a24 24 0 1 1-48 0 24 24 0 1 1 48 0ZM24.65 24.65v14.7h14.7v-14.7Z"
      />
    </svg>
  )
}

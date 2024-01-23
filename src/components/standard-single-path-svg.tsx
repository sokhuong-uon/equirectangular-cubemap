export function StandardSinglePathSVG({ d, className }: { d: string; className?: string }) {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={d} fill="currentColor" />
		</svg>
	)
}

type EquirectangularCardProps = {
	url: string
	onClick: (url: string) => void
}

const EquirectangularCard = ({ url, onClick }: EquirectangularCardProps) => {
	return (
		<button
			className="w-full bg-pink-800 rounded-md aspect-[2/1] overflow-clip "
			onClick={() => onClick(url)}
		>
			<img src={url} alt="pano" className="hover:opacity-70" />
		</button>
	)
}

export { EquirectangularCard }

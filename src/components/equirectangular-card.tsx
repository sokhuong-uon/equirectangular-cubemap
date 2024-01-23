import { useState } from 'react'
import { StandardSinglePathSVG } from './standard-single-path-svg'

type EquirectangularCardProps = {
	url: string
	index: number
	onClick: (url: string) => void
	onDelete: (index: number) => void
}

const EquirectangularCard = ({ url, index, onClick, onDelete }: EquirectangularCardProps) => {
	const [hover, setHover] = useState(false)
	const [mayDelete, setMayDelete] = useState(false)
	return (
		<button
			className="w-full relative bg-pink-800  rounded-md flex-shrink-0 aspect-[2/1] overflow-clip "
			onClick={() => onClick(url)}
			onPointerEnter={() => setHover(true)}
			onPointerLeave={() => setHover(false)}
		>
			<img
				src={url}
				alt="pano"
				className={`${hover && mayDelete ? 'opacity-40' : hover ? 'opacity-75' : 'opacity-100'}`}
			/>
			<div
				onPointerEnter={() => setMayDelete(true)}
				onPointerLeave={() => setMayDelete(false)}
				onClick={e => {
					e.stopPropagation()
					onDelete(index)
				}}
				className={`absolute top-0 right-0 w-8 h-8 flex items-center transition-transform justify-center rounded-bl-lg ${
					hover && mayDelete ? 'scale-150' : hover ? 'scale-100' : 'scale-0'
				}`}
			>
				<StandardSinglePathSVG
					className="text-yellow-300 scale-150 rotate-45"
					d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z"
				/>
			</div>
		</button>
	)
}

export { EquirectangularCard }

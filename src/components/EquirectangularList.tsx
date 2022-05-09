import { useControls } from 'leva'
import { EquirectangularCard } from './EquirectangularCard'
import { AddFileCard } from './AddFileCard'

type EquirectangularListProps = {
	images: string[]
	onItemClick: (url: string) => void
	onFileInputChange: (event: any) => void
	onDeleteItem: (index: number) => void
}

const EquirectangularList = ({
	images,
	onItemClick,
	onFileInputChange,
	onDeleteItem,
}: EquirectangularListProps) => {
	const { showPanoList } = useControls({
		showPanoList: {
			value: false,
			label: 'pano list',
		},
	})

	return (
		<div
			className={`absolute top-0 left-0 w-64 px-2 h-full transition-transform bg-black/80 rounded-r-md transform-gpu ${
				showPanoList ? '' : '-translate-x-full'
			} `}
		>
			<div className="relative flex flex-col w-full h-full select-none">
				<div className="flex items-center justify-center flex-shrink-0 w-full h-12 text-white">
					Equirectangulars
				</div>
				<div className="flex flex-col items-center justify-start flex-1 flex-shrink-0 w-full overflow-auto hidescrollbar gap-y-2">
					{images.map((url, index) => (
						<EquirectangularCard
							url={url}
							index={index}
							key={index}
							onClick={() => onItemClick(url)}
							onDelete={(index: number) => onDeleteItem(index)}
						/>
					))}

					{/* input field */}
					<AddFileCard onChange={onFileInputChange} />
				</div>
			</div>
		</div>
	)
}

export { EquirectangularList }

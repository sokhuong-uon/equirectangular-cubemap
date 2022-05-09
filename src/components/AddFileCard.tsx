import { StandardSinglePathSVG } from './StandardSinglePathSVG'

type AddFileCardProps = {
	onChange: (event: Event) => void
}

const AddFileCard = ({ onChange }: AddFileCardProps) => {
	return (
		<div className="flex-shrink-0 w-full text-5xl relative text-white bg-gray-800/50 hover:bg-gray-600/70 rounded-md aspect-[2/1] flex items-center justify-center">
			<label
				htmlFor="image-input"
				className="flex items-center justify-center w-full h-full text-teal-100 cursor-pointer"
			>
				<StandardSinglePathSVG
					className="scale-150"
					d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z"
				/>
				<StandardSinglePathSVG
					className="scale-150"
					d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z"
				/>
			</label>
			<input
				// @ts-nocheck
				// @ts-ignore
				onChange={onChange}
				className="absolute invisible w-0 h-0"
				type="file"
				accept="image/*"
				multiple
				name="image-input"
				id="image-input"
			/>
		</div>
	)
}

export { AddFileCard }

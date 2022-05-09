import { useState } from 'react'
import { StandardSinglePathSVG } from './StandardSinglePathSVG'

type AddFileCardProps = {
	onChange: (event: Event) => void
	onDrop: (event: DragEvent) => void
}

const AddFileCard = ({ onChange, onDrop }: AddFileCardProps) => {
	const [dragging, setDragging] = useState(false)

	return (
		<div className="flex-shrink-0 w-full text-5xl relative text-white bg-gray-800/50 hover:bg-gray-600/70 rounded-md aspect-[2/1] flex items-center justify-center">
			<label
				onDragOver={e => {
					e.preventDefault()
				}}
				onDrop={e => {
					e.stopPropagation()
					e.preventDefault()
					setDragging(false)
					e.dataTransfer.effectAllowed = 'copy'
					console.log(e.dataTransfer.types)
					console.log(e.dataTransfer.items[0])
					if (e.dataTransfer.files.length) {
						console.log('those are files')
						// @ts-nocheck
						// @ts-ignore
						onDrop(e)
					}
				}}
				onDragEnter={e => {
					e.preventDefault()
					e.stopPropagation()
					setDragging(true)
				}}
				onDragLeave={e => {
					e.preventDefault()
					e.stopPropagation()
					setDragging(false)
				}}
				htmlFor="image-input"
				className={`flex items-center justify-center w-full h-full text-teal-100 cursor-pointer ${
					dragging ? 'border-4 border-yellow-300 border-dashed' : ''
				}`}
			>
				<StandardSinglePathSVG
					className="scale-150 pointer-events-none"
					d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z"
				/>
				<StandardSinglePathSVG
					className="scale-150 pointer-events-none"
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

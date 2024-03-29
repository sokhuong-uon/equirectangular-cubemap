import { useState } from 'react'
import { StandardSinglePathSVG } from './standard-single-path-svg'

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
					if (e.dataTransfer.files.length) {
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
				<div className="flex flex-col items-center justify-center w-full h-full gap-1 pointer-events-none">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="scale-150"
					>
						<g clipPath="url(#clip0_1393_1093)">
							<path
								d="M18.9999 20H5.99992C2.87429 20.0018 0.270809 17.6038 0.0162787 14.4886C-0.238251 11.3733 1.94144 8.58453 5.02592 8.07899C6.44563 5.56188 9.11003 4.0035 11.9999 3.99993C13.8019 3.99312 15.5524 4.60129 16.9619 5.72399C18.346 6.82185 19.33 8.34497 19.7619 10.058C22.3458 10.455 24.1877 12.7755 23.9879 15.3821C23.7882 17.9887 21.6141 20.0014 18.9999 20ZM11.9999 5.99998C9.83163 6.00255 7.83259 7.17209 6.76792 9.06099L6.29992 9.89999L5.35091 10.055C3.3012 10.3984 1.85592 12.2543 2.02513 14.3257C2.19433 16.3971 3.92164 17.9938 5.99992 18H18.9999C20.5685 18.0016 21.8735 16.7946 21.9941 15.2307C22.1147 13.6667 21.0102 12.2739 19.4599 12.035L18.1439 11.835L17.8219 10.543C17.1572 7.8698 14.7545 5.99495 11.9999 5.99998ZM13.4499 16H10.5499V13H7.99992L11.9999 8.99999L15.9999 13H13.4499V16Z"
								fill="currentColor"
							/>
						</g>
						<defs>
							<clipPath id="clip0_1393_1093">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<p className="text-xs ">Drag-Drop or Select files</p>
				</div>
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

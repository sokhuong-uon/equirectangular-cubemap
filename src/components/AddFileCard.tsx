type AddFileCardProps = {
	onChange: (event: any) => void
}
const AddFileCard = ({ onChange }: AddFileCardProps) => {
	return (
		<div className=" w-full text-5xl relative text-white bg-gray-800/50 hover:bg-gray-600/70 rounded-md aspect-[2/1] flex items-center justify-center">
			<label
				htmlFor="input-1"
				className="flex items-center justify-center w-full h-full text-teal-100 cursor-pointer"
			>
				<svg
					className="scale-150"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z" fill="currentColor" />
				</svg>
			</label>
			<input
				onChange={onChange}
				className="absolute invisible w-0 h-0"
				type="file"
				accept="image/*"
				name="image-input"
				id="input-1"
			/>
		</div>
	)
}

export { AddFileCard }

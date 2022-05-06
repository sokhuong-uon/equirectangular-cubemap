import { useThree } from '@react-three/fiber'
import { useRef } from 'react'

type CanvasOutputProps = {
	renderTargetList: THREE.WebGLRenderTarget[]
}

const CanvasOutput = ({ renderTargetList }: CanvasOutputProps) => {
	const canvas = useRef<HTMLCanvasElement>(null!)

	return (
		<>
			<div className="flex items-center justify-between h-12 px-5 bg-black rounded-t-lg pointer-events-auto w-96">
				<button className="flex items-center justify-center w-16 h-10 text-teal-200 bg-teal-500 rounded-lg ">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.535 3.515L7.04999 12L15.535 20.485L16.95 19.071L9.87799 12L16.95 4.929L15.535 3.515Z"
							fill="currentColor"
						/>
					</svg>
				</button>
				{/* download */}
				<button
					onClick={e => {
						e.stopPropagation()
					}}
					className="flex items-center justify-center w-16 h-10 text-teal-200 bg-teal-500 rounded-lg "
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 22H5V20H19V22ZM12 18L6 12L7.41 10.59L11 14.17V2H13V14.17L16.59 10.59L18 12L12 18Z"
							fill="currentColor"
						/>
					</svg>
				</button>

				<button className="flex items-center justify-center w-16 h-10 text-teal-200 bg-teal-500 rounded-lg ">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.46501 20.485L16.95 12L8.46501 3.515L7.05001 4.929L14.122 12L7.05001 19.071L8.46501 20.485Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>
			<div className="rounded-b-lg pointer-events-auto w-96 h-96 overflow-clip">
				<div className="w-full h-full bg-black/60">
					<canvas className="w-full h-full" ref={canvas} id="preview-canvas"></canvas>
				</div>
			</div>
		</>
	)
}

export { CanvasOutput }

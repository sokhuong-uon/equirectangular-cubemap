import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { Suspense, useMemo, useState } from 'react'
import { CamerasAndTargets } from './CamerasAndTargets'
import { EquirectangularCard } from './EquirectangularCard'
import { CanvasOutput } from './CanvasOutput'
import { WebGLRenderTarget } from 'three'

const Equire2Cubemap = () => {
	const [equirectangularImageURL, setEquirectangularImageURL] = useState(
		'/pano/christmas_photo_studio_04.jpg',
	)

	const { dimension, download } = useControls({
		output: folder(
			{
				dimension: {
					value: 1024,
					max: 2048,
					min: 2,
					label: 'dimension(px)',
				},
				download: {
					value: false,
				},
			},
			{
				collapsed: true,
				color: 'orange',
			},
		),
	})

	const renderTargetList = useMemo(() => {
		const PXtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		PXtarget.samples = 8

		const NXtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		NXtarget.samples = 8
		const PYtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		PYtarget.samples = 8
		const NYtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		NYtarget.samples = 8
		const PZtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		PZtarget.samples = 8
		const NZtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		NZtarget.samples = 8
		// [px,nx, py,ny, pz,nz]
		return [PXtarget, NXtarget, PYtarget, NYtarget, PZtarget, NZtarget]
	}, [dimension])

	return (
		<div className="relative flex w-full h-full">
			<Canvas>
				<OrbitControls></OrbitControls>
				<Suspense>
					<CamerasAndTargets
						equirectangularImageURL={equirectangularImageURL}
						renderTargetList={renderTargetList}
					></CamerasAndTargets>
				</Suspense>
			</Canvas>
			<EquirectangularList
				images={['/pano/christmas_photo_studio_04.jpg', '/pano/photo_studio_01.jpg']}
				onItemClick={(url: string) => {
					setEquirectangularImageURL(url)
				}}
			></EquirectangularList>
			<div
				className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none ${
					download ? 'visible' : 'invisible'
				}`}
			>
				<CanvasOutput renderTargetList={renderTargetList}></CanvasOutput>
			</div>
		</div>
	)
}

type EquirectangularListProps = {
	images: string[]
	onItemClick: (url: string) => void
}

const EquirectangularList = ({ images, onItemClick }: EquirectangularListProps) => {
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
				<div className="flex items-center justify-center w-full h-12 text-white">
					Equirectangulars
				</div>
				<div className="flex flex-col flex-1 w-full gap-y-2">
					{images.map((url, index) => (
						<EquirectangularCard url={url} key={index} onClick={() => onItemClick(url)} />
					))}
					<button className="w-full text-5xl text-white bg-gray-800/50 hover:bg-gray-50/70 rounded-md aspect-[2/1] flex items-center justify-center">
						+
					</button>
				</div>
			</div>
		</div>
	)
}

export { Equire2Cubemap }

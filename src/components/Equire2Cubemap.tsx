import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { Suspense, useMemo, useState } from 'react'
import { CamerasAndTargets } from './CamerasAndTargets'
import { CanvasOutput } from './CanvasOutput'
import { WebGLRenderTarget } from 'three'
import { EquirectangularList } from './EquirectangularList'

const Equire2Cubemap = () => {
	const [equirectangularImageURL, setEquirectangularImageURL] = useState(
		'/pano/christmas_photo_studio_04.jpg',
	)

	const [images, setImages] = useState(['/pano/christmas_photo_studio_04.jpg'])

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

	const onFileInputChange = (event: any) => {
		const url = URL.createObjectURL(event.target.files[0])
		setImages(prev => [...prev, url])
	}

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
			<Suspense>
				<EquirectangularList
					images={images}
					onItemClick={(url: string) => {
						setEquirectangularImageURL(url)
					}}
					onFileInputChange={onFileInputChange}
				></EquirectangularList>
			</Suspense>
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

export { Equire2Cubemap }

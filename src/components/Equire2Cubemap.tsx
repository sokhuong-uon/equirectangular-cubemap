import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { buttonGroup, folder, useControls } from 'leva'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { CamerasAndTargets } from './CamerasAndTargets'
import { CanvasOutput } from './CanvasOutput'
import { useCubeCamera } from './useCubeCamera'
import { useCubeRenderTarget } from './useCubeRenderTarget'
import { Scene, sRGBEncoding, WebGLRenderer } from 'three'
import { EquirectangularList } from './EquirectangularList'

const Equire2Cubemap = () => {
	const [equirectangularImageURL, setEquirectangularImageURL] = useState(
		'/pano/christmas_photo_studio_04.jpg',
	)

	const [images, setImages] = useState(['/pano/christmas_photo_studio_04.jpg'])

	const [{ download }, set] = useControls(() => ({
		output: folder(
			{
				download: {
					value: false,
				},
			},
			{
				collapsed: true,
				color: 'orange',
			},
		),
	}))
	const [{ dimension }, setDimension] = useControls(() => ({
		output: folder({
			dimension: {
				value: 1024,
				label: 'dimension(px)',
			},
			dimensionButtonGroup: buttonGroup({
				label: 'Presets',
				opts: {
					'256': (): void => setDimension({ dimension: 256 }),
					'512': (): void => setDimension({ dimension: 512 }),
					'1024': (): void => setDimension({ dimension: 1024 }),
					'2048': (): void => setDimension({ dimension: 2048 }),
				},
			}),
		}),
	}))

	const renderTargetList = useCubeRenderTarget(dimension)
	const cameraList = useCubeCamera()

	const [virtualWebGLRenderer, virtualScene] = useMemo(() => {
		const virtualWebGLRenderer = new WebGLRenderer({ antialias: true })
		virtualWebGLRenderer.setSize(dimension, dimension)
		virtualWebGLRenderer.setPixelRatio(1)
		virtualWebGLRenderer.outputEncoding = sRGBEncoding

		const virtualScene = new Scene()

		return [virtualWebGLRenderer, virtualScene]
	}, [])

	useEffect(() => {
		virtualWebGLRenderer.setSize(dimension, dimension)
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
						virtualScene={virtualScene}
						cameraList={cameraList}
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
				<CanvasOutput
					// onDownload={() => onDownload}
					renderTargetList={renderTargetList}
					virtualRenderer={virtualWebGLRenderer}
					virtualScene={virtualScene}
					cameraList={cameraList}
				></CanvasOutput>
			</div>
		</div>
	)
}

export { Equire2Cubemap }

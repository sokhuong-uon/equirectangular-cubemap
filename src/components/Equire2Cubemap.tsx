import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { CamerasAndTargets } from './CamerasAndTargets'
import { useCubeCamera } from '../hooks/useCubeCamera'
import { useCubeRenderTarget } from '../hooks/useCubeRenderTarget'
import { Scene, sRGBEncoding, WebGLRenderer } from 'three'
import { EquirectangularList } from './EquirectangularList'
import { useSettingControls } from '../hooks/useSettingControls'
import { useSidePresetControls, DownloadFormat } from '../hooks/useSidePresetControls'
import { StandardSinglePathSVG } from './StandardSinglePathSVG'

const Equire2Cubemap = () => {
	const [equirectangularImageURL, setEquirectangularImageURL] = useState(
		'/pano/christmas_photo_studio_04.webp',
	)

	const [images, setImages] = useState(['/pano/christmas_photo_studio_04.webp'])

	const { dimension } = useSettingControls()

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

	const [sideMap] = useState(['px', 'nx', 'py', 'ny', 'pz', 'nz'])

	const download = (side: number, format: DownloadFormat) => {
		virtualWebGLRenderer.render(virtualScene, cameraList[side].current)

		const dataURL = virtualWebGLRenderer.domElement.toDataURL(`image/${format}`)
		const link = document.createElement('a')
		link.download = `${sideMap[side]}.${format}`
		link.href = dataURL
		link.click()
	}

	useSidePresetControls(download)

	useEffect(() => {
		virtualWebGLRenderer.setSize(dimension, dimension)
	}, [dimension])

	const onFileInputChange = (event: Event) => {
		const input = event.target as HTMLInputElement
		if (input.files) {
			if (input.files.length) {
				for (let i = 0; i < input.files.length; i++) {
					const url = URL.createObjectURL(input.files[i])
					setImages(prev => [...prev, url])
				}
			}
		}
	}

	const onDeleteItem = (index: number) => {
		setImages(prev => prev.filter((v, i) => i != index && v))
	}
	const onDropItem = (event: DragEvent) => {
		const files = event.dataTransfer?.files
		if (files) {
			if (files.length) {
				for (let i = 0; i < files.length; i++) {
					if (
						files[i].type === 'image/png' ||
						files[i].type === 'image/jpg' ||
						files[i].type === 'image/jpeg'
					) {
						const url = URL.createObjectURL(files[i])
						setImages(prev => [...prev, url])
					}
				}
			}
		}
	}

	return (
		<div className="relative flex w-full h-full">
			<Canvas frameloop="demand">
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
					onDeleteItem={onDeleteItem}
					onDrop={onDropItem}
				></EquirectangularList>
			</Suspense>
			<a
				target="_blank"
				href="https://github.com/sokhuong-uon/equirectangular-cubemap"
				className="absolute w-12 h-12 rounded-full bottom-2 right-2"
			>
				<StandardSinglePathSVG d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z" />
			</a>
		</div>
	)
}

export { Equire2Cubemap }

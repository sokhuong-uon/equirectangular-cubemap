import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { CamerasAndTargets } from './CamerasAndTargets'
import { useCubeCamera } from '../hooks/useCubeCamera'
import { useCubeRenderTarget } from '../hooks/useCubeRenderTarget'
import { Scene, sRGBEncoding, WebGLRenderer } from 'three'
import { EquirectangularList } from './EquirectangularList'
import { useSettingControls } from '../hooks/useSettingControls'
import { useSidePresetControls } from '../hooks/useSidePresetControls'

const Equire2Cubemap = () => {
	const [equirectangularImageURL, setEquirectangularImageURL] = useState(
		'/pano/christmas_photo_studio_04.jpg',
	)

	const [images, setImages] = useState(['/pano/christmas_photo_studio_04.jpg'])

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

	useSidePresetControls((index: number) => {
		virtualWebGLRenderer.render(virtualScene, cameraList[index].current)
		const dataURL = virtualWebGLRenderer.domElement.toDataURL('image/png')
		const link = document.createElement('a')
		link.download = `${sideMap[index]}.png`
		link.href = dataURL
		link.click()
	})

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
		</div>
	)
}

export { Equire2Cubemap }

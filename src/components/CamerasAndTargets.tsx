import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import { useControls } from 'leva'
import {
	BackSide,
	EquirectangularRefractionMapping,
	PerspectiveCamera,
	Scene,
	sRGBEncoding,
} from 'three'
import { CubicCameras } from './CubicCameras'
import { TextureResult3DDisplay } from './TextureResult3DDisplay'

type CamerasAndTargetsProps = {
	equirectangularImageURL: string
	renderTargetList: THREE.WebGLRenderTarget[]
}

const CamerasAndTargets = ({
	equirectangularImageURL,
	renderTargetList,
}: CamerasAndTargetsProps) => {
	const { gl } = useThree()

	const equirectangularTexture = useTexture(equirectangularImageURL)
	equirectangularTexture.mapping = EquirectangularRefractionMapping
	equirectangularTexture.encoding = sRGBEncoding
	equirectangularTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
	equirectangularTexture.generateMipmaps = true

	const PXCamera = useRef<PerspectiveCamera>(null!)
	const NXCamera = useRef<PerspectiveCamera>(null!)
	const PYCamera = useRef<PerspectiveCamera>(null!)
	const NYCamera = useRef<PerspectiveCamera>(null!)
	const PZCamera = useRef<PerspectiveCamera>(null!)
	const NZCamera = useRef<PerspectiveCamera>(null!)
	const cameraList = [PXCamera, NXCamera, PYCamera, NYCamera, PZCamera, NZCamera]

	const { cameraHelpers } = useControls({
		cameraHelpers: {
			value: false,
			label: 'camera helpers',
		},
	})

	const virtualScene = useMemo(() => new Scene(), [])
	virtualScene.background = equirectangularTexture

	useFrame(state => {
		renderTargetList.forEach((target, index) => {
			state.gl.setRenderTarget(target)
			state.gl.render(virtualScene, cameraList[index].current)
			state.gl.clear()
		})
		state.gl.setRenderTarget(null)
	})

	return (
		<>
			<StatefulAxesHelper />
			<mesh scale={[1, 1, -1]}>
				<sphereBufferGeometry args={[10]}></sphereBufferGeometry>
				<meshBasicMaterial side={BackSide} map={equirectangularTexture}></meshBasicMaterial>
			</mesh>

			<CubicCameras cameraList={cameraList} helpers={cameraHelpers}></CubicCameras>
			<Suspense>
				<TextureResult3DDisplay renderTargetList={renderTargetList}></TextureResult3DDisplay>
			</Suspense>
		</>
	)
}

const StatefulAxesHelper = () => {
	const { axesHelpers } = useControls({
		axesHelpers: {
			value: false,
			label: 'axes helper',
		},
	})

	return <axesHelper visible={axesHelpers}></axesHelper>
}

export { CamerasAndTargets }

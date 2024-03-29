import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { MutableRefObject, Suspense } from 'react'
import { StatefulAxesHelper } from './stateful-axes-helper'
import {
	BackSide,
	EquirectangularRefractionMapping,
	PerspectiveCamera,
	SRGBColorSpace,
} from 'three'
import { CubicCameras } from './cubic-cameras'
import { TextureResult3DDisplay } from './texture-result-3d-display'

type CamerasAndTargetsProps = {
	equirectangularImageURL: string
	renderTargetList: THREE.WebGLRenderTarget[]
	virtualScene: THREE.Scene
	cameraList: MutableRefObject<PerspectiveCamera>[]
}

const CamerasAndTargets = ({
	equirectangularImageURL,
	renderTargetList,
	virtualScene,
	cameraList,
}: CamerasAndTargetsProps) => {
	const { gl } = useThree()

	const equirectangularTexture = useTexture(equirectangularImageURL)
	equirectangularTexture.mapping = EquirectangularRefractionMapping
	equirectangularTexture.colorSpace = SRGBColorSpace
	equirectangularTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
	equirectangularTexture.generateMipmaps = true

	virtualScene.background = equirectangularTexture

	useFrame(state => {
		state.gl.setRenderTarget(renderTargetList[0])
		renderTargetList.forEach((target, index) => {
			state.gl.setRenderTarget(target)

			state.gl.render(virtualScene, cameraList[index].current)
		})
		state.gl.setRenderTarget(null)
	})

	return (
		<>
			<StatefulAxesHelper />
			<mesh scale={[1, 1, -1]}>
				<sphereGeometry args={[10]}></sphereGeometry>
				<meshBasicMaterial side={BackSide} map={equirectangularTexture}></meshBasicMaterial>
			</mesh>

			<CubicCameras cameraList={cameraList}></CubicCameras>
			<Suspense>
				<TextureResult3DDisplay renderTargetList={renderTargetList}></TextureResult3DDisplay>
			</Suspense>
		</>
	)
}

export { CamerasAndTargets }

import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { MutableRefObject, Suspense } from 'react'
import { StatefulAxesHelper } from './StatefulAxesHelper'
import { BackSide, EquirectangularRefractionMapping, PerspectiveCamera, sRGBEncoding } from 'three'
import { CubicCameras } from './CubicCameras'
import { TextureResult3DDisplay } from './TextureResult3DDisplay'

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
	equirectangularTexture.encoding = sRGBEncoding
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
				<sphereBufferGeometry args={[10]}></sphereBufferGeometry>
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

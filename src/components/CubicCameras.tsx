import { MutableRefObject, useEffect } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

type CubicCamerasProps = {
	cameraList: MutableRefObject<THREE.PerspectiveCamera>[]
	helpers?: boolean
}
const CubicCameras = ({ cameraList, helpers = false }: CubicCamerasProps) => {
	useEffect(() => {
		cameraList.forEach(camera => {
			camera.current.aspect = 1
			camera.current.updateProjectionMatrix()
		})
	})

	useEffect(() => {
		cameraList[0].current.lookAt(1, 0, 0) // px
		cameraList[1].current.lookAt(-1, 0, 0) // nx

		cameraList[2].current.lookAt(0, 1, 0) // py
		cameraList[3].current.lookAt(0, -1, 0) // ny

		cameraList[4].current.lookAt(0, 0, 1) // pz
		cameraList[5].current.lookAt(0, 0, -1) // nz
	}, [cameraList])

	const { rotation } = useControls({
		rotation: {
			min: 0,
			max: Math.PI,
			label: 'angle',
			value: 0,
		},
	})

	return (
		<group rotation-y={rotation}>
			{cameraList.map((_, index) => (
				<PerspectiveCamera
					key={index}
					ref={cameraList[index]}
					args={[90, 1, 0.1, 100]}
				></PerspectiveCamera>
			))}
			{helpers &&
				cameraList.map((camera, index) => <cameraHelper key={index} args={[camera.current]} />)}
		</group>
	)
}

export { CubicCameras }

import { MutableRefObject, useEffect } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { folder, useControls } from 'leva'
import * as THREE from 'three'

type CubicCamerasProps = {
	cameraList: MutableRefObject<THREE.PerspectiveCamera>[]
}
const CubicCameras = ({ cameraList }: CubicCamerasProps) => {
	useEffect(() => {
		cameraList.forEach(camera => {
			camera.current.aspect = 1
			camera.current.updateProjectionMatrix()
		}) // run everytime this component re-render
	})

	useEffect(() => {
		cameraList[0].current.lookAt(1, 0, 0) // px
		cameraList[1].current.lookAt(-1, 0, 0) // nx

		cameraList[2].current.lookAt(0, 1, 0) // py
		cameraList[3].current.lookAt(0, -1, 0) // ny

		cameraList[4].current.lookAt(0, 0, 1) // pz
		cameraList[5].current.lookAt(0, 0, -1) // nz
	}, [])

	const { rotation } = useControls({
		output: folder({
			rotation: {
				min: 0,
				max: Math.PI,
				label: 'angle',
				value: 0,
			},
		}),
	})

	const { cameraHelpers } = useControls({
		helpers: folder(
			{
				cameraHelpers: {
					value: false,
					label: 'camera helpers',
				},
			},
			{
				collapsed: true,
			},
		),
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
			{cameraHelpers &&
				cameraList.map((camera, index) => <cameraHelper key={index} args={[camera.current]} />)}
		</group>
	)
}

export { CubicCameras }

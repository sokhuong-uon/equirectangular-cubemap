import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { useSettingControls } from '../hooks/useSettingControls'

type CubicCamerasProps = {
	cameraList: MutableRefObject<THREE.PerspectiveCamera>[]
}
const CubicCameras = ({ cameraList }: CubicCamerasProps) => {
	const group = useRef<THREE.Group>(null!)

	const [rotationTransition] = useState(() => {
		const rotationChangeHandler = (v: number) => {
			group.current.rotation.y = v
		}
		return rotationChangeHandler
	})
	useSettingControls(rotationTransition)

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

	return (
		<group ref={group}>
			{cameraList.map((_, index) => (
				<PerspectiveCamera
					key={index}
					ref={cameraList[index]}
					args={[90, 1, 0.1, 5]}
				></PerspectiveCamera>
			))}
		</group>
	)
}

export { CubicCameras }

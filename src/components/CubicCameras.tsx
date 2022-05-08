import { MutableRefObject, startTransition, useEffect, useMemo, useState } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { SizeLabel } from './SizeLabel'
import { useLabelsControls } from '../hooks/useLabelsControls'
import { useHelpersControls } from '../hooks/useHelpersControls'
import { useOutputControls } from '../hooks/useOutputControls'

type CubicCamerasProps = {
	cameraList: MutableRefObject<THREE.PerspectiveCamera>[]
}
const CubicCameras = ({ cameraList }: CubicCamerasProps) => {
	const [labels] = useState(['+X', '-X', '+Y', '-Y', '+Z', '-Z'])
	const [rotation, setRotation] = useState(0)
	const { cameraHelpers } = useHelpersControls()
	const { show, color } = useLabelsControls()

	const rotationTransition = useMemo(() => {
		const rotationChangeHandler = (v: number) => {
			startTransition(() => {
				setRotation(v)
			})
		}
		return rotationChangeHandler
	}, [])
	useOutputControls(rotationTransition)

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
		<group rotation-y={rotation}>
			{cameraList.map((_, index) => (
				<PerspectiveCamera
					key={index}
					ref={cameraList[index]}
					args={[90, 1, 0.1, 5]}
				></PerspectiveCamera>
			))}
			{cameraHelpers &&
				cameraList.map((camera, index) => (
					<cameraHelper key={index} args={[camera.current]}>
						<SizeLabel
							scale={4}
							visible={show}
							color={color}
							label={labels[index]}
							localPosition={[0, 0, -5]}
						></SizeLabel>
					</cameraHelper>
				))}
		</group>
	)
}

export { CubicCameras }

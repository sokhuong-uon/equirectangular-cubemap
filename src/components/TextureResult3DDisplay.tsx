import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import { a } from '@react-spring/three'
import { FrontSide } from 'three'
import { useOutputPlaneSpringAnimation } from '../hooks/useOutputPlaneSpringAnimation'
import { SizeLabel } from './SizeLabel'
import { useSettingControls } from '../hooks/useSettingControls'
import { useLabelsControls } from '../hooks/useLabelsControls'

type TextureResult3DDisplayProps = {
	renderTargetList: THREE.WebGLRenderTarget[]
}

const TextureResult3DDisplay = ({ renderTargetList }: TextureResult3DDisplayProps) => {
	const { mode } = useSettingControls()

	const springList = useOutputPlaneSpringAnimation(mode)
	const [labels] = useState(['+X', '-X', '+Y', '-Y', '+Z', '-Z'])

	const { gl } = useThree()
	const { color, show } = useLabelsControls()

	renderTargetList.forEach(target => {
		target.texture.anisotropy = gl.capabilities.getMaxAnisotropy()
	})

	const onDownload = () => {}

	return (
		<>
			{renderTargetList.map((target, index) => (
				<a.mesh
					key={index}
					// @ts-nocheck
					// @ts-ignore
					position={springList[index].position}
					// @ts-nocheck
					// @ts-ignore
					rotation={springList[index].rotation}
					// @ts-nocheck
					// @ts-ignore
					scale={springList[index].scale}
					onClick={onDownload}
				>
					<planeBufferGeometry />
					<meshBasicMaterial side={FrontSide} map={target.texture}></meshBasicMaterial>
					<SizeLabel
						visible={show}
						color={color}
						label={labels[index]}
						localPosition={[0, 0, 0.01]}
					></SizeLabel>
				</a.mesh>
			))}
		</>
	)
}

export { TextureResult3DDisplay }

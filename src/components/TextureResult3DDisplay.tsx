import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { useEffect, useState } from 'react'
import { a } from '@react-spring/three'
import { FrontSide } from 'three'
import { useOutputPlaneSpringAnimation } from './useOutputPlaneSpringAnimation'

type TextureResult3DDisplayProps = {
	renderTargetList: THREE.WebGLRenderTarget[]
}

enum DISPLAY_MODE {
	STANDARD,
	CUBE,
}

const TextureResult3DDisplay = ({ renderTargetList }: TextureResult3DDisplayProps) => {
	const labelControls = useControls({
		labels: folder(
			{
				show: true,
				color: '#1400ff',
			},
			{
				collapsed: true,
				color: 'blue',
			},
		),
		output: folder({
			displayMode: {
				options: { CUBE: DISPLAY_MODE.CUBE, DEFAULT: DISPLAY_MODE.STANDARD },
				label: 'mode',
				onChange: latest => {
					setMode(latest)
				},
			},
		}),
	})

	const [mode, setMode] = useState(DISPLAY_MODE.CUBE)

	const [hover, setHover] = useState(false)

	useEffect(() => {
		document.body.style.cursor = hover ? 'pointer' : 'auto'
	}, [hover])

	const springList = useOutputPlaneSpringAnimation(mode)
	const labelList = ['+X', '-X', '+Y', '-Y', '+Z', '-Z']

	const { gl } = useThree()

	renderTargetList.forEach(target => {
		target.texture.anisotropy = gl.capabilities.getMaxAnisotropy()
		target.texture.generateMipmaps = true
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
					<Text
						scale={[2, 2, 2]}
						visible={labelControls.show}
						color={labelControls.color}
						position={[0, 0, 0.01]}
					>
						{labelList[index]}
					</Text>
				</a.mesh>
			))}
		</>
	)
}

export { TextureResult3DDisplay }

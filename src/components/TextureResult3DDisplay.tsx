import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { useEffect, useMemo, useState } from 'react'
import { useSpring, a } from '@react-spring/three'
import { FrontSide } from 'three'

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
		displayMode: {
			value: 1,
			min: 0,
			max: 1,
			step: 1,
			label: 'mode',
			onChange: latest => {
				setMode(latest)
			},
		},
	})

	const [mode, setMode] = useState(DISPLAY_MODE.CUBE)

	const [hover, setHover] = useState(false)

	useEffect(() => {
		document.body.style.cursor = hover ? 'pointer' : 'auto'
	}, [hover])

	// x
	const PXSpring = useSpring({
		scale: mode === DISPLAY_MODE.CUBE ? 2 : 1,
		position: mode === DISPLAY_MODE.CUBE ? [1, 0, 0] : [1, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, -Math.PI / 2, 0] : [0, 0, 0],
	})
	const NXSpring = useSpring({
		scale: mode === DISPLAY_MODE.CUBE ? 2 : 1,
		position: mode === DISPLAY_MODE.CUBE ? [-1, 0, 0] : [-1, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, Math.PI / 2, 0] : [0, 0, 0],
	})
	// y
	const PYSpring = useSpring({
		scale: mode === DISPLAY_MODE.CUBE ? 2 : 1,
		position: mode === DISPLAY_MODE.CUBE ? [0, 1, 0] : [0, 1, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [Math.PI / 2, 0, 0] : [0, 0, 0],
	})
	const NYSpring = useSpring({
		scale: mode === DISPLAY_MODE.CUBE ? 2 : 1,
		position: mode === DISPLAY_MODE.CUBE ? [0, -1, 0] : [0, -1, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
	})
	// z
	const PZSpring = useSpring({
		scale: mode === DISPLAY_MODE.CUBE ? 2 : 1,
		position: mode === DISPLAY_MODE.CUBE ? [0, 0, 1] : [2, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, Math.PI, 0] : [0, 0, 0],
	})
	const NZSpring = useSpring({
		scale: mode === DISPLAY_MODE.CUBE ? 2 : 1,
		position: mode === DISPLAY_MODE.CUBE ? [0, 0, -1] : [0, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, 0, 0] : [0, 0, 0],
	})

	const springList = [PXSpring, NXSpring, PYSpring, NYSpring, PZSpring, NZSpring]
	const labelList = ['+X', '-X', '+Y', '-Y', '+Z', '-Z']

	const { gl } = useThree()

	renderTargetList.forEach(target => {
		target.texture.anisotropy = gl.capabilities.getMaxAnisotropy()
		target.texture.generateMipmaps = true
	})

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
					scale={springList[index].scale}
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

import { useSpring } from '@react-spring/core'
import { invalidate } from '@react-three/fiber'

enum DISPLAY_MODE {
	STANDARD,
	CUBE,
}

export function useOutputPlaneSpringAnimation(mode: DISPLAY_MODE) {
	const scale = mode === DISPLAY_MODE.CUBE ? 2 : 1
	// x
	const PXSpring = useSpring({
		scale,
		position: mode === DISPLAY_MODE.CUBE ? [1, 0, 0] : [1, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, -Math.PI / 2, 0] : [0, 0, 0],
		onChange: () => invalidate(),
	})
	const NXSpring = useSpring({
		scale,
		position: mode === DISPLAY_MODE.CUBE ? [-1, 0, 0] : [-1, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, Math.PI / 2, 0] : [0, 0, 0],
		onChange: () => invalidate(),
	})
	// y
	const PYSpring = useSpring({
		scale,
		position: mode === DISPLAY_MODE.CUBE ? [0, 1, 0] : [0, 1, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [Math.PI / 2, 0, 0] : [0, 0, 0],
		onChange: () => invalidate(),
	})
	const NYSpring = useSpring({
		scale,
		position: mode === DISPLAY_MODE.CUBE ? [0, -1, 0] : [0, -1, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
		onChange: () => invalidate(),
	})
	// z
	const PZSpring = useSpring({
		scale,
		position: mode === DISPLAY_MODE.CUBE ? [0, 0, 1] : [2, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, Math.PI, 0] : [0, 0, 0],
		onChange: () => invalidate(),
	})
	const NZSpring = useSpring({
		scale,
		position: mode === DISPLAY_MODE.CUBE ? [0, 0, -1] : [0, 0, 0],
		rotation: mode === DISPLAY_MODE.CUBE ? [0, 0, 0] : [0, 0, 0],
		onChange: () => invalidate(),
	})

	return [PXSpring, NXSpring, PYSpring, NYSpring, PZSpring, NZSpring]
}

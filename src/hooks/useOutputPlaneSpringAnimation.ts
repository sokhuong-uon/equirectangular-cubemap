import { useSpring } from '@react-spring/core'

enum DISPLAY_MODE {
	STANDARD,
	CUBE,
}

export function useOutputPlaneSpringAnimation(mode: DISPLAY_MODE) {
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

	return [PXSpring, NXSpring, PYSpring, NYSpring, PZSpring, NZSpring]
}

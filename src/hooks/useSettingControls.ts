import { invalidate } from '@react-three/fiber'
import { buttonGroup, folder, useControls } from 'leva'
enum DISPLAY_MODE {
	STANDARD,
	CUBE,
}
export function useSettingControls(onRotationChange?: (v: number) => void) {
	const [outputControls, set] = useControls(() => ({
		setting: folder(
			{
				rotation: {
					min: 0,
					max: Math.PI,
					label: 'angle',
					value: 0,
					onChange: latest => {
						onRotationChange?.(latest)
						invalidate()
					},
				},

				dimension: {
					value: 1024,
					label: 'dimension(px)',
				},
				dimensionButtonGroup: buttonGroup({
					label: 'Presets',
					opts: {
						'256': (): void => set({ dimension: 256 }),
						'512': (): void => set({ dimension: 512 }),
						'1024': (): void => set({ dimension: 1024 }),
						'2048': (): void => set({ dimension: 2048 }),
						'4096': (): void => set({ dimension: 4096 }),
					},
				}),

				mode: {
					options: { CUBE: DISPLAY_MODE.CUBE, DEFAULT: DISPLAY_MODE.STANDARD },
					label: 'mode',
				},
			},
			{
				collapsed: true,
				color: 'lightgreen',
			},
		),
	}))

	return outputControls
}

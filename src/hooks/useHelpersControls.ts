import { folder, useControls } from 'leva'

export function useHelpersControls() {
	return useControls({
		'helpers 🆘': folder(
			{
				axesHelpers: {
					value: false,
					label: 'axes',
				},
				cameraHelpers: {
					value: false,
					label: 'camera',
				},
			},
			{
				collapsed: true,
				color: 'yellow',
			},
		),
	})
}

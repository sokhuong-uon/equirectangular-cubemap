import { folder, useControls } from 'leva'

export function useHelpersControls() {
	return useControls({
		'helpers 🆘': folder(
			{
				axesHelpers: {
					value: false,
					label: 'axes',
				},
			},
			{
				collapsed: true,
				color: 'yellow',
			},
		),
	})
}

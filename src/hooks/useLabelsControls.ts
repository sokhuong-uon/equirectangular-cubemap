import { folder, useControls } from 'leva'

export function useLabelsControls() {
	return useControls({
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
	})
}

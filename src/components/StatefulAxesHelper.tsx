import { folder, useControls } from 'leva'

export function StatefulAxesHelper() {
	const { axesHelpers } = useControls({
		helpers: folder({
			axesHelpers: {
				value: false,
				label: 'axes helper',
			},
		}),
	})

	return <axesHelper visible={axesHelpers}></axesHelper>
}

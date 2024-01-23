import { useHelpersControls } from '../hooks/use-helpers-controls'

export function StatefulAxesHelper() {
	const { axesHelpers } = useHelpersControls()
	return <axesHelper visible={axesHelpers}></axesHelper>
}

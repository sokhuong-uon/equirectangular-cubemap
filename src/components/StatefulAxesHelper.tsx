import { useHelpersControls } from '../hooks/useHelpersControls'

export function StatefulAxesHelper() {
	const { axesHelpers } = useHelpersControls()
	return <axesHelper visible={axesHelpers}></axesHelper>
}

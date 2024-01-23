import ReactThreeTestRenderer from '@react-three/test-renderer'
import { StatefulAxesHelper } from '@/src/components/stateful-axes-helper'
import { expect, it, describe } from 'vitest'

describe('AxesHelper', () => {
	it('will be rendered.', async () => {
		const renderer = await ReactThreeTestRenderer.create(<StatefulAxesHelper />)

		const amountOfChildren = renderer.scene.allChildren.length
		expect(amountOfChildren).toBe(1)

		const axesHelper = renderer.scene.children[0]
		expect(axesHelper.type).toBe('AxesHelper')
	})
})

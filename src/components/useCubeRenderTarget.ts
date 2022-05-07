import { useMemo } from 'react'
import { WebGLRenderTarget } from 'three'

export function useCubeRenderTarget(dimension: number) {
	return useMemo(() => {
		const PXtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		PXtarget.samples = 8

		const NXtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		NXtarget.samples = 8
		const PYtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		PYtarget.samples = 8
		const NYtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		NYtarget.samples = 8
		const PZtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		PZtarget.samples = 8
		const NZtarget = new WebGLRenderTarget(dimension, dimension, {
			stencilBuffer: false,
		})
		NZtarget.samples = 8
		// [px,nx, py,ny, pz,nz]
		return [PXtarget, NXtarget, PYtarget, NYtarget, PZtarget, NZtarget]
	}, [dimension])
}

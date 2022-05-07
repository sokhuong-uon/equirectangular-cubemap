import { useRef, useState } from 'react'
import type { PerspectiveCamera } from 'three'

export function useCubeCamera() {
	const PXCamera = useRef<PerspectiveCamera>(null!)
	const NXCamera = useRef<PerspectiveCamera>(null!)
	const PYCamera = useRef<PerspectiveCamera>(null!)
	const NYCamera = useRef<PerspectiveCamera>(null!)
	const PZCamera = useRef<PerspectiveCamera>(null!)
	const NZCamera = useRef<PerspectiveCamera>(null!)
	const [cameraList] = useState([PXCamera, NXCamera, PYCamera, NYCamera, PZCamera, NZCamera])
	return cameraList
}

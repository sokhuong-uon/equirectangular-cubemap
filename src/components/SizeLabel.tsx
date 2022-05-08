import { Text } from '@react-three/drei'
import { MeshProps, Vector3 } from '@react-three/fiber'
import { ColorRepresentation } from 'three'

type SizeLabelProps = {
	label: string
	localPosition?: Vector3
	color: ColorRepresentation
}

export function SizeLabel({
	label,
	localPosition = 0,
	color,
	...props
}: MeshProps & SizeLabelProps) {
	return (
		<Text color={color} position={localPosition} {...props}>
			{label}
		</Text>
	)
}

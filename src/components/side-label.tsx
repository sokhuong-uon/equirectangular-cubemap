import { Text } from '@react-three/drei'
import { MeshProps, Vector3 } from '@react-three/fiber'
import { ColorRepresentation } from 'three'

type SideLabelProps = {
	label: string
	localPosition?: Vector3
	color: ColorRepresentation
}

export function SideLabel({
	label,
	localPosition = 0,
	color,
	...props
}: MeshProps & SideLabelProps) {
	return (
		<Text color={color} position={localPosition} {...props}>
			{label}
		</Text>
	)
}

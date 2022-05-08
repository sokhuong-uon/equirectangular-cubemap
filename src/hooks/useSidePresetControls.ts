import { buttonGroup, folder, useControls } from 'leva'

export function useSidePresetControls(onChange: (v: number) => void) {
	return useControls({
		download: folder(
			{
				sides: buttonGroup({
					opts: {
						px: (): void => {
							onChange(0)
						},
						nx: (): void => {
							onChange(1)
						},
						py: (): void => {
							onChange(2)
						},
						ny: (): void => {
							onChange(3)
						},
						pz: (): void => {
							onChange(4)
						},
						nz: (): void => {
							onChange(5)
						},
					},
				}),
			},
			{
				collapsed: true,
			},
		),
	})
}

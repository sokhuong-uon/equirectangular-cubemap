import { buttonGroup, folder, useControls } from 'leva'
export type DownloadFormat = 'jpg' | 'png'
export function useSidePresetControls(onChange: (side: number, format: DownloadFormat) => void) {
	const [sidePresetControl, set] = useControls(() => ({
		download: folder(
			{
				format: {
					value: 'jpg',
				},
				options: buttonGroup({
					opts: {
						png: (): void => {
							set({ format: 'png' })
						},
						jpg: (): void => {
							set({ format: 'jpg' })
						},
					},
				}),
				sides: buttonGroup({
					opts: {
						px: (): void => {
							onChange(0, sidePresetControl.format as DownloadFormat)
						},
						nx: (): void => {
							onChange(1, sidePresetControl.format as DownloadFormat)
						},
						py: (): void => {
							onChange(2, sidePresetControl.format as DownloadFormat)
						},
						ny: (): void => {
							onChange(3, sidePresetControl.format as DownloadFormat)
						},
						pz: (): void => {
							onChange(4, sidePresetControl.format as DownloadFormat)
						},
						nz: (): void => {
							onChange(5, sidePresetControl.format as DownloadFormat)
						},
					},
				}),
			},
			{
				collapsed: true,
			},
		),
	}))
	return sidePresetControl
}

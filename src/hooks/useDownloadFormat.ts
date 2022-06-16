import { buttonGroup, folder, useControls } from 'leva'

export function useDownloadFormat(onChange: (format: string) => void) {
	const [formatControl, set] = useControls(() => ({
		download: folder(
			{
				format: {
					value: 'jpg',
					editable: false,
				},
				options: buttonGroup({
					opts: {
						png: (): void => {
							set({ format: 'png' })
							onChange('png')
						},
						jpg: (): void => {
							set({ format: 'jpg' })
							onChange('jpg')
						},
					},
				}),
			},
			{
				collapsed: true,
			},
		),
	}))
	return formatControl
}

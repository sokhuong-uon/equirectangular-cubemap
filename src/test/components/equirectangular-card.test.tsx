import { expect, describe, it } from 'vitest'
import { EquirectangularCard } from '@/src/components/equirectangular-card'
import image from '@/public/pano/christmas_photo_studio_04.jpg'
import { render, screen, fireEvent } from '@testing-library/react'

describe('EquirectangularCard', () => {
	it('will be visible.', async () => {
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<EquirectangularCard index={1} onClick={onClick} onDelete={onDelete} url={image} />)

		expect(screen.getByTestId('equirectangular-card')).toBeVisible()
	})

	it('render image', async () => {
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<EquirectangularCard index={1} onClick={onClick} onDelete={onDelete} url={image} />)

		expect(screen.getByTestId('equirectangular-card-image')).toBeVisible()
	})

	it('emit click event', async () => {
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<EquirectangularCard index={1} onClick={onClick} onDelete={onDelete} url={image} />)

		expect(screen.getByTestId('equirectangular-card')).toBeVisible()
		fireEvent.click(screen.getByTestId('equirectangular-card'))
		expect(onClick).toHaveBeenCalledOnce()
	})

	it('emit delete event', async () => {
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<EquirectangularCard index={1} onClick={onClick} onDelete={onDelete} url={image} />)

		fireEvent.click(screen.getByTestId('equirectangular-card-x-button'))
		expect(onDelete).toHaveBeenCalledOnce()
	})
})

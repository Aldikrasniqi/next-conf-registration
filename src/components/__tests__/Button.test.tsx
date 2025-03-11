import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../ui/button'

describe('Button', () => {
	it('renders with children content', () => {
		render(<Button>Click me</Button>)

		const button = screen.getByRole('button', { name: /click me/i })
		expect(button).toBeInTheDocument()
	})

	it('renders with custom variant and size', () => {
		render(
			<Button variant="secondary" size="lg">
				Secondary
			</Button>
		)

		const button = screen.getByRole('button', { name: /secondary/i })
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('bg-gray-200')
		expect(button).toHaveClass('h-12')
	})

	it('handles click events', () => {
		const handleClick = jest.fn()
		render(<Button onClick={handleClick}>Click me</Button>)

		const button = screen.getByRole('button', { name: /click me/i })
		fireEvent.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('can be disabled', () => {
		const handleClick = jest.fn()
		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>
		)

		const button = screen.getByRole('button', { name: /disabled/i })
		expect(button).toBeDisabled()

		fireEvent.click(button)
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('passes additional props to the button element', () => {
		render(
			<Button data-testid="custom-button" type="submit">
				Submit
			</Button>
		)

		const button = screen.getByTestId('custom-button')
		expect(button).toHaveAttribute('type', 'submit')
	})
})

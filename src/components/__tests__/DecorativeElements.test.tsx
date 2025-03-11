import { render } from '@testing-library/react'
import DecorativeElements from '../DecorativeElements'

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		return null
	},
}))

describe('DecorativeElements', () => {
	it('renders without crashing', () => {
		expect(() => render(<DecorativeElements />)).not.toThrow()
	})
})

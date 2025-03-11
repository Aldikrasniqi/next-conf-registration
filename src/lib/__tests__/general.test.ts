import { generateTicketId } from '../general'

describe('generateTicketId', () => {
	const originalGetRandomValues = crypto.getRandomValues

	beforeAll(() => {
		crypto.getRandomValues = jest.fn((array) => {
			if (array instanceof Uint32Array) {
				array[0] = 123456
			}
			return array
		})
	})

	afterAll(() => {
		crypto.getRandomValues = originalGetRandomValues
	})

	it('generates a ticket ID with the correct format', () => {
		const ticketId = generateTicketId()

		expect(ticketId.startsWith('#')).toBe(true)
		expect(ticketId.length).toBe(7)

		const digits = ticketId.substring(1)
		expect(/^\d{6}$/.test(digits)).toBe(true)
	})

	it('generates the expected ticket ID with mocked random values', () => {
		const ticketId = generateTicketId()
		expect(ticketId).toBe('#123456')
	})

	it('pads numbers with leading zeros when needed', () => {
		const tempMock = jest.fn((array) => {
			if (array instanceof Uint32Array) {
				array[0] = 123
			}
			return array
		})

		const original = crypto.getRandomValues
		crypto.getRandomValues = tempMock

		const ticketId = generateTicketId()
		expect(ticketId).toBe('#000123')

		crypto.getRandomValues = original
	})
})

import { validateImageFile } from '../useRegistrationForm'

describe('validateImageFile', () => {
	it('returns null for valid files', () => {
		const file = new File([''], 'test.jpg', { type: 'image/jpeg' })
		Object.defineProperty(file, 'size', { value: 100 * 1024 })

		const result = validateImageFile(file)
		expect(result).toBeNull()
	})

	it('returns error for files larger than 500KB', () => {
		const file = new File([''], 'test.jpg', { type: 'image/jpeg' })
		Object.defineProperty(file, 'size', { value: 600 * 1024 })

		const result = validateImageFile(file)
		expect(result).toBe('File is too large. Maximum size is 500KB.')
	})
})

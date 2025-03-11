import { personSchema } from '@/schema/person'

describe('Registration Form Validation', () => {
	describe('fullName field', () => {
		it('accepts valid names', () => {
			const result = personSchema.safeParse({
				fullName: 'John Doe',
				email: 'test@example.com',
				githubUsername: 'johndoe',
			})
			expect(result.success).toBe(true)
		})

		it('rejects names that are too short', () => {
			const result = personSchema.safeParse({
				fullName: 'J',
				email: 'test@example.com',
				githubUsername: 'johndoe',
			})
			expect(result.success).toBe(false)

			if (!result.success) {
				const formattedErrors = result.error.format()
				expect(formattedErrors.fullName?._errors).toContain(
					'Name must be at least 2 characters'
				)
			}
		})

		it('rejects empty names', () => {
			const result = personSchema.safeParse({
				fullName: '',
				email: 'test@example.com',
				githubUsername: 'johndoe',
			})
			expect(result.success).toBe(false)

			if (!result.success) {
				const formattedErrors = result.error.format()
				expect(formattedErrors.fullName?._errors).toBeTruthy()
			}
		})
	})

	describe('email field', () => {
		it('accepts valid email addresses', () => {
			const result = personSchema.safeParse({
				fullName: 'John Doe',
				email: 'john.doe@example.com',
				githubUsername: 'johndoe',
			})
			expect(result.success).toBe(true)
		})

		it('rejects invalid email formats', () => {
			const result = personSchema.safeParse({
				fullName: 'John Doe',
				email: 'invalid-email',
				githubUsername: 'johndoe',
			})
			expect(result.success).toBe(false)

			if (!result.success) {
				const formattedErrors = result.error.format()
				expect(formattedErrors.email?._errors).toContain(
					'Please enter a valid email address'
				)
			}
		})

		it('rejects empty email addresses', () => {
			const result = personSchema.safeParse({
				fullName: 'John Doe',
				email: '',
				githubUsername: 'johndoe',
			})
			expect(result.success).toBe(false)

			if (!result.success) {
				const formattedErrors = result.error.format()
				expect(formattedErrors.email?._errors).toBeTruthy()
			}
		})
	})

	describe('githubUsername field', () => {
		it('accepts valid GitHub usernames', () => {
			const result = personSchema.safeParse({
				fullName: 'John Doe',
				email: 'test@example.com',
				githubUsername: 'johndoe123',
			})
			expect(result.success).toBe(true)
		})

		it('rejects empty GitHub usernames', () => {
			const result = personSchema.safeParse({
				fullName: 'John Doe',
				email: 'test@example.com',
				githubUsername: '',
			})
			expect(result.success).toBe(false)

			if (!result.success) {
				const formattedErrors = result.error.format()
				expect(formattedErrors.githubUsername?._errors).toContain(
					'Github username is required'
				)
			}
		})
	})

	describe('multiple field validation', () => {
		it('validates all fields together', () => {
			const result = personSchema.safeParse({
				fullName: '',
				email: 'invalid-email',
				githubUsername: '',
			})
			expect(result.success).toBe(false)

			if (!result.success) {
				const formattedErrors = result.error.format()
				expect(Object.keys(formattedErrors)).toContain('fullName')
				expect(Object.keys(formattedErrors)).toContain('email')
				expect(Object.keys(formattedErrors)).toContain('githubUsername')
			}
		})
	})
})

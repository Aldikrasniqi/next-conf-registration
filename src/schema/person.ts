import { z } from 'zod'

export const personSchema = z.object({
	fullName: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters' }),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	githubUsername: z.string().min(1, { message: 'Github username is required' }),
})

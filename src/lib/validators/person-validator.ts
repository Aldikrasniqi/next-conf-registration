import { Person } from '@/types/person'

type PersonInput = Omit<Person, 'ticketId' | 'location' | 'date'>

export function validatePerson(data: PersonInput): {
	isValid: boolean
	errors: string[]
} {
	const errors: string[] = []

	if (!data.fullName) {
		errors.push('Full name is required')
	} else if (data.fullName.trim().length < 2) {
		errors.push('Full name must be at least 2 characters')
	}

	if (!data.email) {
		errors.push('Email is required')
	} else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
		errors.push('Email format is invalid')
	}

	if (!data.githubUsername) {
		errors.push('GitHub username is required')
	}

	if (!data.avatar) {
		errors.push('Avatar is required')
	}

	return {
		isValid: errors.length === 0,
		errors,
	}
}

import { NextRequest, NextResponse } from 'next/server'
import { Person } from '@/types/person'
import { validatePerson } from '@/lib/validators/person-validator'
import { generateTicketId } from '@/lib/general'
import { date, location } from '@/constants/constants'
import { personSchema } from '@/schema/person'

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get('content-type')
		if (!contentType || !contentType.includes('application/json')) {
			return NextResponse.json(
				{ success: false, errors: ['Content-Type must be application/json'] },
				{ status: 400 }
			)
		}

		let body
		try {
			body = await request.json()
		} catch (_error) {
			return NextResponse.json(
				{ success: false, errors: ['Invalid JSON in request body'] },
				{ status: 400 }
			)
		}

		const zodResult = personSchema.safeParse(body)
		if (!zodResult.success) {
			const errors = zodResult.error.errors.map(
				(err) => `${err.path.join('.')}: ${err.message}`
			)
			return NextResponse.json({ success: false, errors }, { status: 400 })
		}

		const validation = validatePerson(body)
		if (!validation.isValid) {
			return NextResponse.json(
				{ success: false, errors: validation.errors },
				{ status: 400 }
			)
		}

		const person: Person = {
			avatar: body.avatar,
			fullName: body.fullName,
			email: body.email,
			githubUsername: body.githubUsername,
			ticketId: generateTicketId(),
			location: location,
			date: date,
		}

		return NextResponse.json({
			success: true,
			data: person,
		})
	} catch (_error) {
		return NextResponse.json(
			{ success: false, errors: ['Failed to generate ticket'] },
			{ status: 500 }
		)
	}
}

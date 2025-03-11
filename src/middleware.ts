import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/api/generate-ticket')) {
		if (request.method === 'POST') {
			const contentType = request.headers.get('content-type')
			if (!contentType || !contentType.includes('application/json')) {
				return NextResponse.json(
					{ success: false, error: 'Content-Type must be application/json' },
					{ status: 400 }
				)
			}
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/api/generate-ticket/:path*'],
}

'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			hasError: false,
			error: null,
		}
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="flex flex-col items-center justify-center p-8 text-white bg-red-900/20 rounded-lg h-screen w-screen">
						<h2 className="text-xl font-bold mb-4">Something went wrong</h2>
						<p className="mb-4">
							Please try refreshing the page or contact support if the problem
							persists.
						</p>
						<button
							onClick={() => this.setState({ hasError: false, error: null })}
							className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
						>
							Try again
						</button>
					</div>
				)
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary

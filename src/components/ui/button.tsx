import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'sm' | 'md' | 'lg'
}

export function Button({
	children,
	variant = 'primary',
	size = 'md',
	className = '',
	...props
}: ButtonProps) {
	const baseStyles =
		'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50'

	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
		outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
	}

	const sizeStyles = {
		sm: 'h-8 px-3 text-xs',
		md: 'h-10 px-4 text-sm',
		lg: 'h-12 px-6 text-base',
	}

	const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	)
}

import { cn } from '../utils'

describe('cn (className utility)', () => {
	it('combines class names correctly', () => {
		const result = cn('class1', 'class2')
		expect(result).toBe('class1 class2')
	})

	it('handles conditional class names', () => {
		const condition = true
		const result = cn('base-class', condition && 'conditional-class')
		expect(result).toBe('base-class conditional-class')
	})

	it('filters out falsy values', () => {
		const result = cn('class1', false && 'class2', null, undefined, 0, 'class3')
		expect(result).toBe('class1 class3')
	})

	it('handles objects with class mappings', () => {
		const result = cn('base', { active: true, disabled: false })
		expect(result).toBe('base active')
	})

	it('merges tailwind classes correctly', () => {
		const result = cn('px-2 py-1', 'px-4')
		expect(result).toBe('py-1 px-4')
	})
})

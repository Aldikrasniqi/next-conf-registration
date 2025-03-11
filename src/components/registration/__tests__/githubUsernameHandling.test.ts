import { renderHook, act } from '@testing-library/react'

jest.mock('react-hook-form', () => ({
	useForm: () => ({
		register: jest.fn(),
		handleSubmit: jest.fn(),
		formState: { errors: {} },
		reset: jest.fn(),
		setValue: jest.fn(),
	}),
}))

jest.mock('@/store/useTicket', () => ({
	__esModule: true,
	default: () => ({
		setPerson: jest.fn(),
		setSuccess: jest.fn(),
	}),
}))

import useRegistrationForm from '../useRegistrationForm'

describe('GitHub Username Handling', () => {
	it('removes @ symbol from GitHub usernames', () => {
		const { result } = renderHook(() => useRegistrationForm())

		const setValueMock = jest.fn()
		const setGithubValueMock = jest.fn()

		result.current.handleGithubChange = (
			e: React.ChangeEvent<HTMLInputElement>
		) => {
			const value = e.target.value

			if (value === '') {
				setGithubValueMock('')
				setValueMock('githubUsername', '')
				return
			}

			const cleanValue = value.replace(/@/g, '')

			setGithubValueMock(cleanValue)
			setValueMock('githubUsername', cleanValue)
		}

		act(() => {
			result.current.handleGithubChange({
				target: { value: '@johndoe' },
			} as React.ChangeEvent<HTMLInputElement>)
		})

		expect(setGithubValueMock).toHaveBeenCalledWith('johndoe')
		expect(setValueMock).toHaveBeenCalledWith('githubUsername', 'johndoe')

		setGithubValueMock.mockClear()
		setValueMock.mockClear()

		act(() => {
			result.current.handleGithubChange({
				target: { value: '@@john@doe@' },
			} as React.ChangeEvent<HTMLInputElement>)
		})

		expect(setGithubValueMock).toHaveBeenCalledWith('johndoe')
		expect(setValueMock).toHaveBeenCalledWith('githubUsername', 'johndoe')

		setGithubValueMock.mockClear()
		setValueMock.mockClear()

		act(() => {
			result.current.handleGithubChange({
				target: { value: '' },
			} as React.ChangeEvent<HTMLInputElement>)
		})

		expect(setGithubValueMock).toHaveBeenCalledWith('')
		expect(setValueMock).toHaveBeenCalledWith('githubUsername', '')
	})
})

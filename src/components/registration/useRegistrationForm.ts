import { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { blobUrlToBase64, compressImage } from '@/lib/general'
import useTicketStore from '@/store/useTicket'
import { personSchema } from '@/schema/person'

export type FormPerson = z.infer<typeof personSchema>

export const validateImageFile = (file: File): string | null => {
	if (file.size > 500 * 1024) {
		return 'File is too large. Maximum size is 500KB.'
	}
	return null
}

export default function useRegistrationForm() {
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [fileError, setFileError] = useState<string | null>(null)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [githubValue, setGithubValue] = useState('')

	const fileInputRef = useRef<HTMLInputElement>(null)
	const store = useTicketStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<FormPerson>({
		resolver: zodResolver(personSchema),
		defaultValues: {
			fullName: '',
			email: '',
			githubUsername: '',
		},
		mode: 'onChange',
	})

	const resetForm = useCallback(() => {
		reset({
			fullName: '',
			email: '',
			githubUsername: '',
		})
		setSelectedImage(null)
		setFileError(null)
		setSubmitError(null)
		setGithubValue('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}, [reset])

	const onSubmit = useCallback(
		async (data: FormPerson) => {
			setIsSubmitting(true)
			if (submitError) {
				setSubmitError(null)
			}

			try {
				let avatarData = ''
				if (selectedImage) {
					avatarData = await blobUrlToBase64(selectedImage)
				}

				const formDataWithAvatar = {
					...data,
					avatar: avatarData,
				}

				const response = await fetch('/api/generate-ticket', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formDataWithAvatar),
				})

				const responseData = await response.json()

				if (!response.ok) {
					if (responseData.errors && Array.isArray(responseData.errors)) {
						throw new Error(responseData.errors[0] || 'Failed to register')
					} else {
						throw new Error('Failed to register. Please try again.')
					}
				}

				if (response.ok) {
					store.setPerson(responseData.data)
					store.setSuccess(true)
					resetForm()
				}
			} catch (error) {
				console.error('Registration error:', error)
				setSubmitError(
					error instanceof Error
						? error.message
						: 'An unexpected error occurred'
				)
			} finally {
				setIsSubmitting(false)
			}
		},
		[selectedImage, submitError, store, resetForm]
	)

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			setFileError(null)

			if (file) {
				const error = validateImageFile(file)
				if (error) {
					setFileError(error)
					if (fileInputRef.current) {
						fileInputRef.current.value = ''
					}
					return
				}

				try {
					const compressedFile = await compressImage(file, 500 * 1024)
					const imageUrl = URL.createObjectURL(compressedFile)
					setSelectedImage(imageUrl)
				} catch (error) {
					setFileError('Failed to process image. Please try another one.')
					console.error('Image compression error:', error)
				}
			}
		},
		[]
	)

	const handleRemoveImage = useCallback(() => {
		setSelectedImage(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}, [])

	const handleGithubChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value

			if (value === '') {
				setGithubValue('')
				setValue('githubUsername', '')
				return
			}

			const cleanValue = value.replace(/@/g, '')

			setGithubValue(cleanValue)
			setValue('githubUsername', cleanValue)
		},
		[setValue]
	)

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		isSubmitting,
		submitError,
		setSubmitError,
		fileError,
		selectedImage,
		fileInputRef,
		handleFileChange,
		handleRemoveImage,
		githubValue,
		handleGithubChange,
	}
}

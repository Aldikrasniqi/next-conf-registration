'use client'

import { useEffect } from 'react'
import useRegistrationForm from './useRegistrationForm'
import {
	FormField,
	GitHubUsernameInput,
	AvatarUploadSection,
	SubmitButton,
	ErrorToast,
} from './FormComponents'

export default function RegistrationForm() {
	const {
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
	} = useRegistrationForm()

	useEffect(() => {
		return () => {
			if (selectedImage) {
				URL.revokeObjectURL(selectedImage)
			}
		}
	}, [selectedImage])

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-6 lg:w-[420px] w-full"
				noValidate
			>
				<AvatarUploadSection
					selectedImage={selectedImage}
					fileInputRef={fileInputRef}
					handleFileChange={handleFileChange}
					handleRemoveImage={handleRemoveImage}
					fileError={fileError}
				/>

				<FormField
					name="fullName"
					label="Full Name"
					placeholder="John Doe"
					register={register}
					errors={errors}
				/>

				<FormField
					name="email"
					label="Email Address"
					type="email"
					placeholder="example@email.com"
					register={register}
					errors={errors}
				/>

				<GitHubUsernameInput
					value={githubValue}
					onChange={handleGithubChange}
					error={errors.githubUsername?.message as string | undefined}
				/>

				<SubmitButton isSubmitting={isSubmitting} />
			</form>

			{submitError && (
				<ErrorToast
					message={submitError}
					onClose={() => setSubmitError(null)}
				/>
			)}
		</>
	)
}

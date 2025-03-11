import { memo, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { FormPerson } from './useRegistrationForm'

export const ErrorMessage = memo(({ message }: { message: string }) => (
	<p className="text-red-500 text-xs mt-1" role="alert">
		{message}
	</p>
))

export const ErrorToast = memo(
	({ message, onClose }: { message: string; onClose: () => void }) => {
		useEffect(() => {
			if (message) {
				const timer = setTimeout(() => {
					onClose()
				}, 5000)
				return () => clearTimeout(timer)
			}
		}, [message, onClose])

		return (
			<div className="fixed bottom-4 right-4 bg-red-900/80 text-white p-4 rounded-md shadow-lg z-50 flex items-center gap-3">
				<div className="flex-1">{message}</div>
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation()
						onClose()
					}}
					className="text-white hover:text-gray-200"
					aria-label="Close"
				>
					✕
				</button>
			</div>
		)
	}
)

export const FormField = memo(
	({
		name,
		label,
		type = 'text',
		placeholder,
		register,
		errors,
	}: {
		name: keyof FormPerson
		label: string
		type?: string
		placeholder: string
		register: any
		errors: any
	}) => {
		const errorMessage = errors[name]?.message as string | undefined

		return (
			<div className="space-y-2">
				<Label htmlFor={name}>{label}</Label>
				<div className="relative">
					<Input
						id={name}
						type={type}
						placeholder={placeholder}
						{...register(name)}
						className={`bg-white/5 backdrop-blur-sm border-gray-600 ${
							errors[name] ? 'border-red-500' : ''
						}`}
						aria-invalid={errors[name] ? 'true' : 'false'}
						aria-describedby={errors[name] ? `${name}-error` : undefined}
					/>
					{errorMessage && <ErrorMessage message={errorMessage} />}
				</div>
			</div>
		)
	}
)

export const GitHubUsernameInput = memo(
	({
		value,
		onChange,
		error,
	}: {
		value: string
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
		error?: string
	}) => (
		<div className="space-y-2">
			<Label htmlFor="githubUsername">GitHub Username</Label>
			<div className="relative">
				<div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-md"></div>
				<Input
					id="githubUsername"
					type="text"
					placeholder="yourusername"
					className={`w-full relative z-10 bg-transparent ${
						error ? 'border-red-500' : 'border-gray-500 py-5'
					}`}
					value={value}
					onChange={onChange}
				/>
			</div>
			{error && <ErrorMessage message={error} />}
		</div>
	)
)

export const AvatarUploadSection = memo(
	({
		selectedImage,
		fileInputRef,
		handleFileChange,
		handleRemoveImage,
		fileError,
	}: {
		selectedImage: string | null
		fileInputRef: React.MutableRefObject<HTMLInputElement | null>
		handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
		handleRemoveImage: () => void
		fileError: string | null
	}) => (
		<div className="space-y-2 w-full">
			<Label htmlFor="dropzone-file">Upload Avatar</Label>
			<div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-600 rounded-lg bg-white/5 backdrop-blur-sm">
				{selectedImage ? (
					<div className="flex flex-col items-center gap-3 bg-transparent p-3">
						<div className="w-10 h-10 rounded-md overflow-hidden border-2 border-gray-400 mt-1">
							<img
								src={selectedImage}
								alt="Avatar preview"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex gap-4">
							<button
								type="button"
								onClick={handleRemoveImage}
								className="text-gray-400 hover:text-white bg-white/10 px-1 py-0.5- rounded-sm text-xs hover:bg-white/20 hover:underline cursor-pointer"
								aria-label="Remove uploaded image"
							>
								Remove Image
							</button>
							<label
								htmlFor="dropzone-file"
								className="text-gray-400 hover:text-white cursor-pointer text-xs bg-white/10 p-1 rounded-sm hover:bg-white/20 hover:underline"
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										document.getElementById('dropzone-file')?.click()
									}
								}}
							>
								Change Image
							</label>
						</div>
					</div>
				) : (
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center py-6 cursor-pointer w-full"
						tabIndex={0}
						role="button"
						aria-label="Upload avatar image"
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								document.getElementById('dropzone-file')?.click()
							}
						}}
					>
						<div className="flex flex-col items-center justify-center">
							<div className="rounded-md bg-white/10 flex items-center justify-center mb-2 h-10 w-10 border-gray-300">
								<img
									src="/images/icon-upload.svg"
									alt="Upload icon"
									className="w-auto h-auto"
								/>
							</div>
							<p className="text-md text-gray-400">
								Drag and drop or click to upload
							</p>
						</div>
					</label>
				)}
				<input
					id="dropzone-file"
					type="file"
					className="hidden"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept="image/png,image/jpeg"
					aria-label="Upload avatar image"
				/>
			</div>
			{fileError ? (
				<p className="text-red-500 text-xs mt-2" role="alert">
					{fileError}
				</p>
			) : (
				<p className="text-gray-500 text-xs mt-2 flex items-center">
					<img
						src="/images/icon-info.svg"
						alt="Information icon"
						className="w-5 h-5 mr-1"
					/>
					Upload your photo (JPG or PNG, max size: 500KB)
				</p>
			)}
		</div>
	)
)

export const SubmitButton = memo(
	({ isSubmitting }: { isSubmitting: boolean }) => (
		<Button
			type="submit"
			className="w-full !bg-[#F57463] hover:!bg-[#F57463]/90 text-slate-900 font-bold cursor-pointer"
			disabled={isSubmitting}
			data-testid="submit-button"
		>
			{isSubmitting ? (
				<div className="flex items-center justify-center gap-2">
					<Spinner size="sm" />
					<span>Generating ticket...</span>
				</div>
			) : (
				'Generate Ticket'
			)}
		</Button>
	)
)

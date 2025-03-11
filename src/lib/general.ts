/**
 * Converts a blob URL to a base64 string
 * @param blobUrl The URL of the blob to convert
 * @returns A Promise that resolves to a base64 string
 */
export const blobUrlToBase64 = async (blobUrl: string): Promise<string> => {
	const response = await fetch(blobUrl)
	const blob = await response.blob()
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result as string)
		reader.onerror = reject
		reader.readAsDataURL(blob)
	})
}

/**
 * Generates a random 6-digit ticket ID
 * @returns A string representing the ticket ID
 */
export const generateTicketId = (): string => {
	const array = new Uint32Array(1)
	crypto.getRandomValues(array)

	const randomNumber = array[0] % 1000000
	const paddedNumber = randomNumber.toString().padStart(6, '0')

	return `#${paddedNumber}`
}

/**
 * Compresses an image file to reduce its size
 * @param file The image file to compress
 * @param maxSizeBytes Maximum size in bytes (default: 500KB)
 * @returns A Promise that resolves to a compressed File object
 */
export const compressImage = async (
	file: File,
	maxSizeBytes: number = 500 * 1024
): Promise<File> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (event) => {
			const img = new Image()
			img.src = event.target?.result as string

			img.onload = () => {
				const canvas = document.createElement('canvas')
				let width = img.width
				let height = img.height

				let ratio = 1

				if (file.size <= maxSizeBytes) {
					resolve(file)
					return
				}

				const quality = 0.8

				if (width > 1200 || height > 1200) {
					ratio = Math.min(1200 / width, 1200 / height)
					width *= ratio
					height *= ratio
				}

				canvas.width = width
				canvas.height = height

				const ctx = canvas.getContext('2d')
				ctx?.drawImage(img, 0, 0, width, height)

				canvas.toBlob(
					(blob) => {
						if (!blob) {
							reject(new Error('Canvas to Blob conversion failed'))
							return
						}

						const compressedFile = new File([blob], file.name, {
							type: file.type,
							lastModified: Date.now(),
						})

						resolve(compressedFile)
					},
					file.type,
					quality
				)
			}

			img.onerror = () => {
				reject(new Error('Failed to load image'))
			}
		}

		reader.onerror = () => {
			reject(new Error('Failed to read file'))
		}
	})
}

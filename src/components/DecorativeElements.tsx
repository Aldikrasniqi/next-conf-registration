import Image from 'next/image'

export default function DecorativeElements() {
	return (
		<>
			<Image
				src="/images/pattern-squiggly-line-top.svg"
				alt="Squiggly line pattern"
				className="absolute top-14 right-0"
				width={310}
				height={100}
			/>

			<Image
				src="/images/pattern-lines.svg"
				alt="Lines pattern"
				className="absolute top-0 left-0 h-full w-full"
				width={1920}
				height={1080}
			/>

			<Image
				src="/images/pattern-circle.svg"
				alt="Circle pattern"
				className="absolute bottom-50 right-56"
				width={180}
				height={180}
			/>

			<Image
				src="/images/pattern-squiggly-line-bottom-desktop.svg"
				alt="Circle pattern"
				className="absolute bottom-0 -left-2"
				width={610}
				height={400}
			/>
		</>
	)
}

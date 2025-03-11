'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import RegistrationForm from '@/components/RegistrationForm'
import useTicketStore from '@/store/useTicket'
import TicketCard from '@/components/TicketCard'

const DecorativeElements = dynamic(
	() => import('@/components/DecorativeElements'),
	{
		ssr: true,
		loading: () => <div className="w-full h-full" />,
	}
)

export default function Home() {
	const store = useTicketStore()

	return (
		<div className="bg-desktop w-full h-screen font-inconsolata">
			<div className="relative w-full h-full">
				<Image
					src="/images/logo-full.svg"
					alt="Logo"
					className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					width={180}
					height={150}
					priority
				/>

				<DecorativeElements />

				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-white w-full h-full">
					{!store.success && !store.person.avatar ? (
						<div className="flex flex-col items-center justify-center md:w-2/3 w-full h-full mx-auto gap-4">
							<div className="flex flex-col items-center justify-center gap-4 lg:w-full lg:p-0 p-10">
								<h1 className="md:text-5xl text-3xl font-bold text-center">
									Your Journey to Coding Conf 2025 Starts Here!
								</h1>
								<p className="text-center text-xl text-gray-300 font-medium">
									Secure your spot at next year's biggest coding conference{' '}
								</p>
							</div>
							<div className="lg:mt-6 lg:h-[500px] w-11/12 lg:w-auto">
								<RegistrationForm />
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center md:justify-center justify-start md:pt-0 pt-20 md:w-2/3 w-full h-full mx-auto gap-4">
							<div className="flex flex-col items-center justify-center gap-4 lg:w-full lg:p-0 p-4">
								<h1 className="lg:text-6xl text-4xl font-bold text-center leading-tighter lg:w-2/3 w-full">
									Congrats,{' '}
									<span className="bg-gradient-to-r from-[hsl(7,86%,67%)] to-[hsl(0,0%,100%)] bg-clip-text text-transparent">
										{store.person.fullName}
									</span>
									! Your ticket is ready.
								</h1>
								<p className="text-center text-xl text-gray-300 font-medium lg:w-[500px] mt-4">
									We've emailed your ticket to{' '}
									<span className="font-bold text-[#F57463]">
										{store.person.email}
									</span>{' '}
									and we will send updates in the run up to the event.
								</p>
							</div>
							<div className="lg:mt-10 lg:p-0 p-4">
								<TicketCard person={store.person} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

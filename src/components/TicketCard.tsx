import { Person } from '@/types/person'

interface TicketCardProps {
	person: Person
}

export default function TicketCard({ person }: TicketCardProps) {
	return (
		<div
			className="relative w-full h-full"
			role="region"
			aria-label="Conference Ticket"
		>
			<img
				src="/images/pattern-ticket.svg"
				alt="Ticket background pattern"
				className="backdrop-blur-xs"
				width={560}
				height={500}
			/>
			<div className="absolute bottom-0 left-0 w-full h-full">
				<div className="h-full w-full flex flex-row-reverse justify-between items-center">
					<div
						className="transform rotate-90 text-gray-400 text-2xl font-medium flex justify-center items-center md:p-4"
						aria-label={`Ticket ID: ${person.ticketId}`}
					>
						{person.ticketId}
					</div>
					<div className="flex flex-col gap-4 items-start justify-between h-full md:p-6 p-4 w-full">
						<div className="flex flex-col gap-1 items-start justify-start w-full">
							<img
								src="/images/logo-full.svg"
								alt="Coding Conference 2025 Logo"
								className="lg:w-[250px] w-[220px]"
							/>
							<div className="flex flex-col items-start justify-center gap-2 ms-12">
								<span
									className="text-md text-gray-300 font-light"
									aria-label={`Event details: ${person.location} on ${person.date}`}
								>
									{person.location} / {person.date}
								</span>
							</div>
						</div>
						<div className="flex flex-row gap-4 items-center justify-start">
							<img
								src={person.avatar}
								alt={`${person.fullName}'s profile picture`}
								className="lg:w-18 lg:h-18 w-12 h-12 rounded-xl border-1 border-white/20"
							/>
							<div className="flex flex-col items-start justify-center lg:gap-2">
								<h1 className="lg:text-3xl text-xl font-medium">
									{person.fullName}
								</h1>
								<span className="flex flex-row gap-2 items-center">
									<img
										src="/images/icon-github.svg"
										alt="GitHub icon"
										className="w-5 h-5"
									/>
									<p className="text-md text-gray-300 font-medium">
										{person.githubUsername.startsWith('@')
											? person.githubUsername.slice(1)
											: `@${person.githubUsername}`}
									</p>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

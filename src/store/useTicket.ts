import { create } from 'zustand'
import { Person } from '@/types/person'

interface TicketStore {
	person: Person
	loading: boolean
	success: boolean
	reset: () => void
	setPerson: (person: Person) => void
	setSuccess: (success: boolean) => void
}

const useTicketStore = create<TicketStore>((set) => {
	return {
		person: {} as Person,
		loading: false,
		success: false,
		reset: () => set({ person: {} as Person, loading: false, success: false }),
		setPerson: (person: Person) => set({ person }),
		setSuccess: (success: boolean) => set({ success }),
	}
})

export default useTicketStore

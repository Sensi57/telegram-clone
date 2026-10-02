import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Credentials } from '@/shared/api/greenApi'

type State = { credentials: Credentials | null; login: (c: Credentials) => void; logout: () => void }

export const useSession = create<State>()(
  persist(
    (set) => ({ credentials: null, login: (credentials) => set({ credentials }), logout: () => set({ credentials: null }) }),
    { name: 'session' },
  ),
)

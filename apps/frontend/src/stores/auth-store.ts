import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  initialized: boolean
  setToken: (token: string) => void
  clearToken: () => void
  markInitialized: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      initialized: false,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      markInitialized: () => set({ initialized: true }),
    }),
    {
      name: 'ms-cobranca-auth',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => localStorage)
          : undefined,
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate auth state', error)
        }
        state?.markInitialized()
      },
    },
  ),
)

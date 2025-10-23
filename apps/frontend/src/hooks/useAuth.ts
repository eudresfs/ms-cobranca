import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '../stores/auth-store'

export function useAuth() {
  const token = useAuthStore((state) => state.token)
  const setToken = useAuthStore((state) => state.setToken)
  const clearToken = useAuthStore((state) => state.clearToken)
  const initialized = useAuthStore((state) => state.initialized)
  const [hasHydrated, setHasHydrated] = useState(() => useAuthStore.persist.hasHydrated())

  useEffect(() => {
    const unsubFinish = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true)
    })

    return () => {
      unsubFinish?.()
    }
  }, [])

  const login = useCallback(
    (nextToken: string) => {
      setToken(nextToken)
    },
    [setToken],
  )

  const logout = useCallback(() => {
    clearToken()
  }, [clearToken])

  return {
    token,
    login,
    logout,
    isAuthenticated: Boolean(token),
    hasHydrated: hasHydrated || initialized,
  }
}

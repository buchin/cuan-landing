import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

export interface OwnerInfo {
  id: string
  display_name?: string
  username?: string
  email: string
  name?: string
  role?: string
  is_active?: boolean
}

interface AuthContextType {
  user: OwnerInfo | null
  token: string
  isAuthenticated: boolean
  isLoading: boolean
  setupRequired: boolean | null
  setupError: string
  isOwner: boolean
  role: string
  login: (identifier: string, password: string) => Promise<void>
  setup: (email: string, password: string) => Promise<void>
  acceptInvite: (token: string, name: string, password: string) => Promise<void>
  setSession: (token: string, user: OwnerInfo) => void
  logout: () => Promise<void>
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>
  refreshUser: () => Promise<void>
  getAuthHeaders: () => HeadersInit
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = 'cuan_token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY) || ''
    }
    return ''
  })
  const [user, setUser] = useState<OwnerInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [setupRequired, setSetupRequired] = useState<boolean | null>(null)
  const [setupError, setSetupError] = useState('')

  const getAuthHeaders = useCallback((): HeadersInit => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }, [token])

  const refreshUser = useCallback(async () => {
    try {
      // 1. Check setup status
      const statusRes = await fetch('/api/v1/auth/status')
      if (statusRes.ok) {
        const statusData = await statusRes.json()
        setSetupRequired(statusData.setup_required ?? false)
        setSetupError('')
      } else {
        setSetupRequired(null)
        setSetupError(`Setup status endpoint returned HTTP ${statusRes.status}.`)
      }

      // 2. If token exists, fetch profile from /api/v1/auth/me
      const currentToken = localStorage.getItem(TOKEN_KEY) || token
      {
        const meRes = await fetch('/api/v1/auth/me', {
          headers: {
            'Content-Type': 'application/json',
            ...(currentToken
              ? { Authorization: `Bearer ${currentToken}` }
              : {}),
          },
        })

        if (meRes.ok) {
          const meData = await meRes.json()
          const ownerInfo = meData.user || meData.owner
          if (ownerInfo) {
            setUser(ownerInfo)
            setToken(currentToken)
          }
        } else if (meRes.status === 401) {
          // Token expired or invalid
          localStorage.removeItem(TOKEN_KEY)
          setToken('')
          setUser(null)
        }
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : 'Network request failed.'
      setSetupRequired(null)
      setSetupError(`Could not reach the setup status endpoint: ${detail}`)
      console.error('Failed to load user session:', err)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  // Form progress stays local: changing global boot loading would unmount the
  // form and discard its draft/error on an authentication failure.
  const authenticate = async (path: string, payload: Record<string, string>) => {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      if (path.endsWith('/setup') && res.status === 403) {
        setSetupRequired(false)
        throw new Error('This workspace already has an owner. Sign in to continue.')
      }
      throw new Error(data.error || 'Could not sign in. Try again.')
    }
    const receivedUser = data.user || data.owner
    if (!data.token || !receivedUser?.id) throw new Error('Could not confirm your account. Try signing in.')
    localStorage.setItem(TOKEN_KEY, data.token)
    setToken(data.token)
    setUser(receivedUser)
    setSetupRequired(false)
  }

  const login = (identifier: string, password: string) =>
    authenticate('/api/v1/auth/login', {
      username: identifier.trim(), email: identifier.trim(), password: password.trim(),
    })

  const setup = (email: string, password: string) =>
    authenticate('/api/v1/auth/setup', { email: email.trim(), password: password.trim() })

  const logout = async () => {
    try {
      const currentToken = localStorage.getItem(TOKEN_KEY) || token
      if (currentToken) {
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.getRegistration()
            const sub = await registration?.pushManager?.getSubscription()
            if (sub) {
              const abort = new AbortController()
              const timeout = setTimeout(() => abort.abort(), 3000)
              try {
                await fetch('/api/v1/notifications/push', {
                  method: 'DELETE',
                  headers: {
                    Authorization: 'Bearer ' + currentToken,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(sub.toJSON()),
                  signal: abort.signal,
                })
              } finally {
                clearTimeout(timeout)
                await sub.unsubscribe()
              }
            }
          } catch {
            /* Clear the local session even if the push service is unavailable. */
          }
        }
        await fetch('/api/v1/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentToken}`,
          },
        })
      }
    } catch (err) {
      console.warn('Logout request error:', err)
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      setToken('')
      setUser(null)
    }
  }

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const currentToken = localStorage.getItem(TOKEN_KEY) || token
    const res = await fetch('/api/v1/auth/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
      },
      body: JSON.stringify({
        current_password: currentPassword.trim(),
        new_password: newPassword.trim(),
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Could not change password')
    }
  }

  const role = user?.role || 'owner'
  const isOwner = role !== 'member'

  const setSession = (newToken: string, newUser: OwnerInfo) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
    setUser(newUser)
    setSetupRequired(false)
  }

  const acceptInvite = async (inviteToken: string, name: string, password: string) => {
    const res = await fetch('/api/v1/auth/invites/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: inviteToken.trim(),
        name: name.trim(),
        password: password.trim(),
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Could not accept invitation.')
    }
    const receivedUser = data.user || data.owner
    if (!data.token || !receivedUser?.id) {
      throw new Error('Could not confirm your account. Try signing in.')
    }
    setSession(data.token, receivedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        setupRequired,
        setupError,
        isOwner,
        role,
        login,
        setup,
        acceptInvite,
        setSession,
        logout,
        changePassword,
        refreshUser,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CURRENT_USER_KEY = 'em_current_user'

const AuthContext = createContext(null)

function readCurrentUser() {
  try {
    // First try to get user from localStorage 'user' key (set by login/signup)
    const userRaw = localStorage.getItem('user')
    if (userRaw) {
      return JSON.parse(userRaw)
    }
    // Fallback to old key for backward compatibility
    const raw = localStorage.getItem(CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCurrentUser(user) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem('user')
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(() => readCurrentUser())

  // Initialize user from localStorage on mount
  useEffect(() => {
    const user = readCurrentUser()
    if (user) {
      setCurrentUserState(user)
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    writeCurrentUser(currentUser)
  }, [currentUser])

  // Wrapper function to update current user
  const setCurrentUser = (user) => {
    setCurrentUserState(user)
    writeCurrentUser(user)
  }

  const logout = () => {
    setCurrentUserState(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  const value = useMemo(() => ({ 
    currentUser, 
    setCurrentUser,
    logout 
  }), [currentUser])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}








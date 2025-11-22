<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/config'
=======
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CURRENT_USER_KEY = 'em_current_user'
>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44

// create context
const AuthContext = createContext(null)

<<<<<<< HEAD
export const AuthProvider = ({ children }) => {
  // keep user in state + localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  // 🔹 LOGIN – calls backend /api/auth/login
  const login = async ({ email, password }) => {
    try {
      const res = await api.post('/api/auth/login', { email, password })

      const { token, user } = res.data || {}

      if (token) {
        localStorage.setItem('token', token)
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        setCurrentUser(user)
      }

      return user
    } catch (error) {
      console.error('Login error:', error)

      const msg =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? 'Invalid email or password'
          : 'Login failed')

      // so Login.jsx can catch(err) and show err.message
      throw new Error(msg)
    }
  }

  // 🔹 SIGNUP – you can also use context for signup if needed
  const signup = async ({ name, email, password }) => {
    try {
      const res = await api.post('/api/auth/signup', { name, email, password })
      const { token, user } = res.data || {}

      if (token) {
        localStorage.setItem('token', token)
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        setCurrentUser(user)
      }

      return user
    } catch (error) {
      console.error('Signup error:', error)
      const msg =
        error.response?.data?.message || 'Signup failed'
      throw new Error(msg)
    }
=======
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
>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
  }

  // 🔹 LOGOUT
  const logout = () => {
<<<<<<< HEAD
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
  }
=======
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
>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

<<<<<<< HEAD
// hook to use in components
export const useAuth = () => useContext(AuthContext)
=======
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}







>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44

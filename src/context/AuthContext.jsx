import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/config'

// create context
const AuthContext = createContext(null)

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
  }

  // 🔹 LOGOUT
  const logout = () => {
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// hook to use in components
export const useAuth = () => useContext(AuthContext)

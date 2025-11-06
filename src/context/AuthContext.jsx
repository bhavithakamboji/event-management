import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const USERS_KEY = 'em_users'
const CURRENT_USER_KEY = 'em_current_user'

const AuthContext = createContext(null)

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCurrentUser(user) {
  if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(CURRENT_USER_KEY)
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readUsers())
  const [currentUser, setCurrentUser] = useState(() => readCurrentUser())

  useEffect(() => {
    writeUsers(users)
  }, [users])

  useEffect(() => {
    writeCurrentUser(currentUser)
  }, [currentUser])

  const signup = (payload) => {
    const { name, email, password } = payload
    const normalizedEmail = String(email).trim().toLowerCase()
    const existing = users.find(u => u.email === normalizedEmail)
    if (existing) {
      throw new Error('An account with this email already exists')
    }
    const newUser = { id: crypto.randomUUID(), name: String(name).trim(), email: normalizedEmail, password }
    const nextUsers = [...users, newUser]
    setUsers(nextUsers)
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email })
    return { id: newUser.id, name: newUser.name, email: newUser.email }
  }

  const login = ({ email, password }) => {
    const normalizedEmail = String(email).trim().toLowerCase()
    const user = users.find(u => u.email === normalizedEmail && u.password === password)
    if (!user) {
      throw new Error('Invalid email or password')
    }
    setCurrentUser({ id: user.id, name: user.name, email: user.email })
    return { id: user.id, name: user.name, email: user.email }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = useMemo(() => ({ users, currentUser, signup, login, logout }), [users, currentUser])

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




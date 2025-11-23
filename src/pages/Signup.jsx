import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/config'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setSubmitting(true)
    try {
      // Send only required fields to backend (name, email, password)
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }

      console.log('Submitting signup to:', 'http://localhost:8080/api/auth/signup')
      console.log('Signup data:', signupData)

      // 🔹 Make sure no old/invalid token is sent in Authorization header
      localStorage.removeItem('token')

      const response = await api.post('/api/auth/signup', signupData)
      console.log('Signup successful:', response.data)

      // Store the token and user info (optional – you can also just redirect to login)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
      }

      // Show success message and redirect
      alert('Account created successfully! Please login with your credentials.')
      navigate('/login')
    } catch (error) {
      console.error('Signup failed:', error)
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        code: error?.code
      })

      let errorMessage = ''

      // Check for network errors
      if (
        error?.code === 'ERR_NETWORK' ||
        error?.message?.includes('Network Error') ||
        error?.message?.includes('Failed to fetch')
      ) {
        errorMessage = 'Network Error: Cannot connect to the server.\n\n'
        errorMessage += 'Please ensure:\n'
        errorMessage += '1. Backend server is running on http://localhost:8080\n'
        errorMessage += '2. MySQL database is running\n'
        errorMessage += '3. Check browser console (F12) for more details'
      } else if (error?.response) {
        // Server responded with error
        errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          `Server error (${error?.response?.status}): ${error?.response?.statusText}`
      } else {
        errorMessage = error?.message || 'Signup failed. Please try again.'
      }

      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up to get started</p>
          </div>
          {error && (
            <div
              style={{
                color: 'red',
                marginTop: '8px',
                marginBottom: '8px',
                padding: '10px',
                backgroundColor: '#ffe6e6',
                border: '1px solid #ff9999',
                borderRadius: '5px',
                whiteSpace: 'pre-line'
              }}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-button" disabled={submitting}>
              {submitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

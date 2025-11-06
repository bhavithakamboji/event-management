import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setSubmitting(true)
      await Promise.resolve(login({ email: formData.email, password: formData.password }))
      navigate('/')
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Login to your account</p>
          </div>
          {error && (<p style={{ color: 'red', marginTop: '8px' }}>{error}</p>)}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="auth-button" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
          </form>
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <div className="social-login">
              <div className="social-icons">
                <button className="social-icon google">
                  <i className="fab fa-google"></i>
                </button>
                <button className="social-icon facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="social-icon twitter">
                  <i className="fab fa-twitter"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
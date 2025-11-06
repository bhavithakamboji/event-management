import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!email) {
      setError('Please enter your email address')
      return
    }

    try {
      setSubmitting(true)
      // Simulate API call - replace with actual password reset API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would call your backend API here
      // await axios.post('/api/auth/forgot-password', { email })
      
      setSuccess(true)
      
      // Optionally redirect after a delay
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      setError(err?.message || 'Failed to send password reset request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <div className="auth-header">
            <h2>Forgot Password?</h2>
            <p>Enter your email address and we'll send you a link to reset your password</p>
          </div>
          
          {error && (
            <div style={{ 
              color: 'red', 
              marginTop: '8px', 
              padding: '10px',
              backgroundColor: '#fee',
              borderRadius: '5px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}

          {success ? (
            <div style={{ 
              color: 'green', 
              marginTop: '8px', 
              padding: '15px',
              backgroundColor: '#efe',
              borderRadius: '5px',
              border: '1px solid #cfc',
              textAlign: 'center'
            }}>
              <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                ✓ Password reset request sent successfully!
              </p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Please check your email for password reset instructions. 
                You will be redirected to the login page shortly...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="auth-button" 
                disabled={submitting}
              >
                {submitting ? 'Sending Request...' : 'Request Password Reset'}
              </button>
            </form>
          )}

          <div className="auth-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p>
              Remember your password? <Link to="/login">Back to Login</Link>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


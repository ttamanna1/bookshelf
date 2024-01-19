import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function Register() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/register/', formData, {
        validateStatus: () => true,
      })
  
      if (res.status === 201) {
        // Successful registration
        navigate('/login')
      } else if (res.status === 400) {
        // Unsuccessful registration 
        if (res.data.username?.[0] === "A user with that username already exists.") {
          setErrorMessage("Username must be unique.")
        } else if (res.data.non_field_errors?.[0] === "Passwords do not match.") {
          setErrorMessage('Passwords do not match.')
        } else {
          // Handle other validation errors if needed
          console.error('Other validation errors:', res.data)
          setErrorMessage('Registration failed. Please check your information.')
        }
      } else {
        // Handle other status codes if needed
        console.error('Unexpected status code:', res.status)
        setErrorMessage('Registration failed. Please try again later.')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setErrorMessage('Registration failed. Please try again later.')
    }
  }


  return (
    <>
      <form method="post" className="register-form" onSubmit={handleSubmit}>
        <div className="border">
          <input className="field" type="text" name="username" placeholder='Username' onChange={handleChange} value={formData.username}/><br />
          <input className="field" type="email" name="email" placeholder='Email address' onChange={handleChange} value={formData.email}/><br />
          <input className="field" type="password" name="password" placeholder='Password' onChange={handleChange} value={formData.password}/><br />
          <input className="field" type="password" name="password_confirmation" placeholder='Confirm password' onChange={handleChange} value={formData.password_confirmation}/><br /><br />
          <button className="button" type="submit">Sign Up</button><br /><br />
          {errorMessage && <p className="danger">{errorMessage}</p>}
          <p className="register">Already have an account?{'\u00a0'} <Link to="/login"className='button small'>Login</Link></p>
        </div>
      </form>
    </>
  )
}
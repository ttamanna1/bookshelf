import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { setToken } from '../utilities/helpers/common'

export default function Login() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  
  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login/', formData, {
        validateStatus: () => true,
      })

      if (res?.status === 401) {
        setErrorMessage('Invalid username or password.')
      } else if (res?.status === 200) {
        setToken(res.data.access)
        navigate('/wishlist')
      } else {
        console.error('Other errors', res.data)
        setErrorMessage('Login failed. Please try again later.')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setErrorMessage('Login failed. Please try again later.')
    }
  }

  return (
    <>
      <form className='login-form' method="POST" onSubmit={handleSubmit}>
        <div className='border'>
        <input type="text" name="username" placeholder='Username' onChange={handleChange} value={formData.username} className='field'/><br/ ><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} className='field'/><br /><br />
        <button className='button' type="submit">Login</button><br /><br />
        {errorMessage && <p className='danger'>{errorMessage}</p>}
        <p className='login'>Don&apos;t have an account?{'\u00a0'} <Link to="/register" className='button small'>Sign Up</Link></p>
        </div>
      </form>
    </>
  )
}
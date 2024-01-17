import { useEffect } from 'react'
import { Form, useActionData, useNavigate, Link } from 'react-router-dom'
import { setToken } from '../utilities/helpers/common'

export default function Login() {
  const res = useActionData()
  // console.log('res:', res)
  const navigate = useNavigate()
  
  useEffect(() => {
    // console.log(res)
    if (res?.status === 200){
      // console.log(res.data.access)
      setToken(res.data.access)
      navigate('/wishlist')
    }
  }, [res, navigate])

  return (
    <>
      <Form className='login-form' method="POST">
        <input type="text" name="username" placeholder='Username' /><br/ ><br />
        <input type="password" name="password" placeholder="Password" /><br /><br />
        <button className='reg-login-btn' type="submit">Login</button><br /><br />
        {res && <p className='danger'>{res.data.message}</p>}
        <p className='login'>Don&apos;t have an account?{'\u00a0'} <Link to="/register" className='button'>Sign up here</Link></p>
      </Form>
    </>
  )
}
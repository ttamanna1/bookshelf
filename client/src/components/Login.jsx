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
        <div className='border'>
        <input type="text" name="username" placeholder='Username' className='field'/><br/ ><br />
        <input type="password" name="password" placeholder="Password" className='field'/><br /><br />
        <button className='button' type="submit">Login</button><br /><br />
        {res && <p className='danger'>{res.data.message}</p>}
        <p className='login'>Don&apos;t have an account?{'\u00a0'} <Link to="/register" className='button small'>Sign Up</Link></p>
        </div>
      </Form>
    </>
  )
}
import { useEffect } from "react"
import { Form, useActionData, useNavigate, Link } from "react-router-dom"

export default function Register() {
  const res = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    if (res?.status === 201) {
      navigate('/login')
    }
  }, [res, navigate])


  return (
    <>

      <Form method="post" className="registerform" >
        <input className="registeruser" type="text" name="username" placeholder='Username' /><br /><br />
        <input className="registeremail" type="email" name="email" placeholder='Email address' /><br /><br />
        <input className="registerpass" type="password" name="password" placeholder='Password' /><br /><br />
        <input className="registerpasscon" type="password" name="password_confirmation" placeholder='Confirm password' /><br /><br />
        <button className="reg-login-btn" type="submit">Sign Up</button><br /><br />
        <p className="register">Already have an account?{'\u00a0'} <Link to="/login"className='button'>Login</Link></p>
        {res && <p className="danger">{res.data.message}</p>}
      </Form>
    </>
  )
}
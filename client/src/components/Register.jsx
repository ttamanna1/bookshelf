import { useEffect } from "react"
import { Form, useActionData, useNavigate, Link } from "react-router-dom"

export default function Register() {
  const res = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    // if successful registering user, navigate to login page
    if (res?.status === 201) {
      navigate('/login')
    }
  }, [res, navigate])


  return (
    <>
      <Form method="post" className="register-form" >
        <div className="border">
          <input className="field" type="text" name="username" placeholder='Username' /><br />
          <input className="field" type="email" name="email" placeholder='Email address' /><br />
          <input className="field" type="password" name="password" placeholder='Password' /><br />
          <input className="field" type="password" name="password_confirmation" placeholder='Confirm password' /><br /><br />
          <button className="button" type="submit">Sign Up</button><br /><br />
          <p className="register">Already have an account?{'\u00a0'} <Link to="/login"className='button small'>Login</Link></p>
          {res && <p className="danger">{res.data.message}</p>}
        </div>
      </Form>
    </>
  )
}
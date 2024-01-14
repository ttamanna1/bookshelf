import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <h1>bookshelf</h1>
      <Link to='/wishlist'>Wishlist</Link>
      <Link to='/register'>Sign Up</Link>
      <Link to='/login'>Login</Link>
    </>
    
  )
}
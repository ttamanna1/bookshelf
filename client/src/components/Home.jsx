import { Link } from "react-router-dom"
import bookImg from '../assets/book-image.png'

export default function Home() {
  return (
    <>
      <div className="homepage">
        <p>Welcome to your personal bookshelf, where you can keep tabs on your reading list!</p>
        <img src={bookImg} alt='Book Image' className='book-image'></img>
      </div>
      <Link to='/register'>Sign Up</Link>
      <Link to='/login'>Login</Link>
    </>
    
  )
}
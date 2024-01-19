import { Link } from "react-router-dom"
import bookImg from '../assets/book-image.png'

export default function Home() {
  return (
    <>
      <div className="homepage">
        <p>Welcome to your personal bookshelf, where you can keep tabs on your reading list!</p>
        <img src={bookImg} alt='Book Image' className='book-image'></img>
        <div className="home-buttons">
          <Link to='/register' className="button">Sign Up</Link>
          <Link to='/login' className="button">Login</Link>
        </div>
      </div>
    </>
    
  )
}
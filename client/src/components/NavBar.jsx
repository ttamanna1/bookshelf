import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


// Helpers
import { activeUser, removeToken } from '../utilities/helpers/common'


export default function NavBar() {
  const navigate = useNavigate()

  function handleLogOut(){
    // Remove token from storage
    removeToken()
    // Navigate to the log in page
    navigate('/')
  }

  return (
    <>
      <nav className='link-container'>
            { activeUser() ?
              <>                
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/currently-reading">Currently Reading</Link>
                <Link to='/finished'>Finished</Link>
                <span className='logout' onClick={handleLogOut}>Log out</span>
              </>
              :
              <>
                
              </>
            }
          </nav>
    </>
  )
}
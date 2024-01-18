import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logoLight from '../assets/logo-light.png'
import logoDark from '../assets/logo-dark.png'
import toggleLight from '../assets/night.png'
import toggleDark from '../assets/day.png'


// Helpers
import { activeUser, removeToken } from '../utilities/helpers/common'

// eslint-disable-next-line
export default function Nav({ theme, setTheme }) {
  const navigate = useNavigate()

  function handleLogOut(){
    // Remove token from storage
    removeToken()
    // Navigate to the log in page
    navigate('/')
  }

  // toggle light and dark theme
  const toggleMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <>
      <nav className='navbar'>
        { activeUser() ?
          <> 
            <img src={theme === 'light' ? logoLight : logoDark} alt='bookshelf' className='logo'/>
            <ul>
              <li><Link to="/wishlist" className='links'>Wishlist</Link></li>
              <li><Link to="/currently-reading" className='links'>Currently Reading</Link></li>
              <li><Link to='/finished' className='links'>Finished</Link></li>
              <li><span className='logout' onClick={handleLogOut}>Log out</span></li>
            </ul>  
            <img onClick={toggleMode} src={theme === 'light' ? toggleLight : toggleDark} alt='' className='toggle-icon'/>             
            
          </>
          :
          <> 
            <img src={theme === 'light' ? logoLight : logoDark} alt='bookshelf' className='logo'/>  
            <img onClick={toggleMode} src={theme === 'light' ? toggleLight : toggleDark} alt='' className='toggle-icon'/>        
          </>
        }
      </nav>
    </>
  )
}
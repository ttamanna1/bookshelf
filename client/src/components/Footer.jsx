import { Link } from 'react-router-dom'
//Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className='footer'>
      <Link target='_blank' to='https://github.com/ttamanna1' className='links'>
      <FontAwesomeIcon icon={faGithub} /> Tamanna</Link>
    </footer>
  )
}
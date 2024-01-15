import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Outlet, useNavigation } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'


function App() {
  
  const navigation = useNavigation()  

  return (
    <>
      <NavBar />
      <main>
        {
          navigation.state === 'idle' ?
          <Outlet />
          :
          <div className="centred">
            <Spinner animation='border' />
          </div>
        }
      </main>
      <Footer />
    </>
  )
}

export default App

import Nav from './components/Nav'
import Footer from './components/Footer'
import { Outlet, useNavigation } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'


function App() {
  
  const navigation = useNavigation()  

  const currentTheme = localStorage.getItem('currentTheme')
  const [ theme, setTheme ] = useState(currentTheme ? currentTheme : 'light')

  useEffect(() => {
    localStorage.setItem('currentTheme', theme)
  }, [theme])

  return (
    <>
      <div className={`container ${theme}`}>
        <Nav theme={theme} setTheme={setTheme}/>
        <main>
          {
            navigation.state === 'idle' ?
            <Outlet theme={theme} setTheme={setTheme}/>
            :
            <div className="centred">
              <Spinner animation='border' theme={theme} setTheme={setTheme}/>
            </div>
          }
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

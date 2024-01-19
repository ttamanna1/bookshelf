import Nav from './components/Nav'
import Footer from './components/Footer'
import { Outlet, useNavigation } from 'react-router-dom'
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
            <Outlet />
            :
            <div className="centred">
              <p>Loading...</p>
            </div>
          }
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

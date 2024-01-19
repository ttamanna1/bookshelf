import { useRouteError } from "react-router-dom"
import Nav from "./Nav"
import Footer from "./Footer"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  console.log('Error Status ->', error.status)

  return (
    <>
      <Nav />
      <div className="error-page">
        <p>Sorry, an unexpected error has occurred!</p>
      </div>
      <Footer />
    </>
  )
}
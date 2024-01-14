import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Styles
import './styles/main.scss'

// Page Components
import App from './App'
import ErrorPage from './components/ErrorPage'
import Home from './components/Home'
import BookIndex from './components/BookIndex'
import SingleBook from './components/SingleBook'
import Wishlist from './components/Wishlist'
import CurrentlyReading from './components/CurrentlyReading'
import Finished from './components/Finished'
import CreateBook from './components/CreateBook'
import EditBook from './components/EditBook'
import Register from './components/Register'
import Login from './components/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/books',
        element: <BookIndex />
      },
      {
        path: '/books/:bookId',
        element: <SingleBook />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        path: '/currently-reading',
        element: <CurrentlyReading />
      },
      {
        path: '/finished',
        element: <Finished />
      },
      {
        path: '/books/create',
        element: <CreateBook />
      },
      {
        path: '/books/:bookId/edit',
        element: <EditBook />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

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

// Loaders
import { getAllBooks, getBookAndGenres, getSingleBook } from './utilities/loaders/books'
import { registerUser, loginUser } from './utilities/actions/auth'
import { bookCreate, bookEdit } from './utilities/actions/createOrEditBook'

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
        element: <BookIndex />,
        loader: getAllBooks
      },
      {
        path: '/books/:bookId',
        element: <SingleBook />,
        loader: async ({ params }) => getBookAndGenres(params.bookId)
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
        element: <CreateBook />,
        action: async ({ request }) => bookCreate(request),
      },
      {
        path: '/books/:bookId/edit',
        element: <EditBook />,
        action: async ({ request, params }) => bookEdit(request, params.bookId),
        loader: async ({ params }) => getSingleBook(params.bookId)
      },
      {
        path: '/register',
        element: <Register />,
        action: async ({ request }) => registerUser(request),
      },
      {
        path: '/login',
        element: <Login />,
        action: async ({ request }) => loginUser(request)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

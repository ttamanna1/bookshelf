
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../utilities/helpers/common'

export default function Finished() {

  //! State
  const [books, setBooks] = useState([])
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate()

  //! Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/books/?status=finished', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch finished data')
        }
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching finished list:', error)
      }
    }
    fetchData()
  }, [update])

  const handleMoveToCategory = async (bookId, newCategory) => {
    try {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, status: newCategory } : book
        )
      )
      await axios.patch(`/api/books/${bookId}/`, { status: newCategory }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(`Book moved to ${newCategory}`)
      setUpdate(!update)
      navigate(`/${newCategory}`)
    } catch (error) {
      console.error(`Error moving to ${newCategory}: `, error)
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, status: 'wishlist' } : book
        )
      )
    }
  }

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`/api/books/${bookId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
      console.log(`Book deleted`)
    } catch (error) {
      console.error(`Error deleting book: `, error)
    }
  }

  return (
    <div>
      <h1>Finished</h1>
      <Link to={'/books/create'} className="button">Add To Finished</Link>
      {books.map(book => {
          const { id, title, image } = book
          return (
            <div key={id}>
              <Link to={`/books/${id}`} className="card-layout">
                <div className="card" style={{width: '20rem'}}>
                  <img className="card-img-top" src={image} alt={title} style={{height: '150px', objectFit: 'cover'}}/>
                </div> 
              </Link>
              <button onClick={() => handleMoveToCategory(book.id, 'wishlist')} className='button'>Move to Wishlist</button>
              <button onClick={() => handleMoveToCategory(book.id, 'currently-reading')} className='button'>Move to Currently Reading</button>
              <Link to={`/books/${id}/edit`} className="button">Edit</Link>
              <button onClick={() => handleDeleteBook(book.id)} className='button'>Delete</button>
            </div>
          )
        })}
    </div>
  )

}

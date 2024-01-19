
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../utilities/helpers/common'

export default function Wishlist() {

  //! State
  const [books, setBooks] = useState([])
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate()

  //! Effects
  // retrieves data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/books/?status=wishlist', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist data')
        }
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching wishlist:', error)
      }
    }
    fetchData()
  }, [update])

  // moves book to slected category (status)
  const handleMoveToCategory = async (bookId, newCategory) => {
    try {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, status: newCategory } : book
        )
      )
      // updates book status by using patch
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

  // deletes book
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
    <div className='status-page'>
      <h1>Wishlist</h1>
      <Link to={'/books/create'} className="button">Add To Wishlist</Link>
      {books.map(book => {
          const { id, title, image } = book
          return (
            <div key={id} className='entry'>
              <Link to={`/books/${id}`} className="entry-layout">
                  <img className="entry-img" src={image} alt={title}/>
              </Link>
              <div className='move'>
                <button onClick={() => handleMoveToCategory(book.id, 'currently-reading')} className='button medium'>Move to Currently Reading</button>
                <button onClick={() => handleMoveToCategory(book.id, 'finished')} className='button medium'>Move to Finished</button>
              </div>
              <div className='move'>
                <Link to={`/books/${id}/edit`} className="button medium edit">Edit</Link>
                <button onClick={() => handleDeleteBook(book.id)} className='button medium delete'>Delete</button>
              </div>
            </div>
          )
        })}
    </div>
  )

}


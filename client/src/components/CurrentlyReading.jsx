
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getToken } from '../utilities/helpers/common'

export default function CurrentlyReading() {

  //! State
  const [books, setBooks] = useState([])
  const [update, setUpdate] = useState(false)

  //! Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/books/?status=currently-reading', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch currently reading data')
        }
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching current reading list:', error)
      }
    }
    fetchData()
  }, [update])

  const handleMoveToCategory = async (bookId, newCategory) => {
    try {
      console.log('Before state update:', books);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, status: newCategory } : book
        )
      )
      console.log('After state update:', books);
      await axios.patch(`/api/books/${bookId}/`, { status: newCategory }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(`Book moved to ${newCategory}`)
      setUpdate(!update)
    } catch (error) {
      console.error(`Error moving to ${newCategory}: `, error)
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, status: 'wishlist' } : book
        )
      )
    }
  }

  return (
    <div>
      <h1>Currently Reading</h1>
      {books.map(book => {
          const { id, title, image } = book
          return (
            <div key={id}>
              <Link to={`/books/${id}`} className="card-layout">
                <div className="card" style={{width: '20rem'}}>
                  <img className="card-img-top" src={image} alt={title} style={{height: '150px', objectFit: 'cover'}}/>
                </div> 
              </Link>
              <button onClick={() => handleMoveToCategory(book.id, 'wishlist')}>Move to Wishlist</button>
              <button onClick={() => handleMoveToCategory(book.id, 'finished')}>Move to Finished</button>
            </div>
          )
        })}
    </div>
  )

}

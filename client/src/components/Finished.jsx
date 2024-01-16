
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

  return (
    <div>
      <h1>Finished</h1>
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
              <button onClick={() => handleMoveToCategory(book.id, 'currently-reading')}>Move to Currently Reading</button>
            </div>
          )
        })}
    </div>
  )

}

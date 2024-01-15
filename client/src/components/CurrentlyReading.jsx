
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CurrentlyReading() {

  //! State
  const [books, setBooks] = useState( [])

  //! Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/books/?status=currently-reading')
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
  }, [])

  const handleMoveToCategory = async (bookId, newCategory) => {
    try {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, status: newCategory } : book
        )
      )
      await axios.put(`/api/books/${bookId}/`, { status: newCategory })
      console.log(`Book moved to ${newCategory}`)
  
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
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.image} 
            <button onClick={() => handleMoveToCategory(book.id, 'wishlist')}>Move to Wishlist</button>
            <button onClick={() => handleMoveToCategory(book.id, 'finished')}>Move to Finished</button>
          </li>
        ))}
      </ul>
    </div>
  )

}

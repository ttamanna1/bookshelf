import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function CurrentlyReading() {
  const booklist = useLoaderData()

  //! State
  const [books, setBooks] = useState(booklist || [])
  

  const handleMoveToCategory = async (bookId, newCategory) => {
    try {
      await axios.put(`/api/books/${bookId}/`, { status: newCategory })
      console.log(`Book moved to ${newCategory}`)
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
    } catch (error) {
      console.error(`Error moving to ${newCategory}: `, error)
    }
  }

  return (
    <div>
      <h1>Currently Reading</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => handleMoveToCategory(book.id, 'wishlist')}>Move to Wishlist</button>
            <button onClick={() => handleMoveToCategory(book.id, 'finished')}>Move to Finished</button>
          </li>
        ))}
      </ul>
    </div>
  )

}
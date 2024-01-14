import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'



export default function Wishlist() {
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
      <h1>Wishlist</h1>
      <button>Add to Wishlist</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => handleMoveToCategory(book.id, 'currently-reading')}>Move to Currently Reading</button>
            <button onClick={() => handleMoveToCategory(book.id, 'finished')}>Move to Finished</button>
          </li>
        ))}
      </ul>
    </div>
  )


}
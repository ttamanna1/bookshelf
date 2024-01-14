
import { useEffect, useState } from 'react'
import axios from 'axios'



export default function Wishlist() {

  //! State
  const [books, setBooks] = useState( [])

  //! Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/books/?status=wishlist')
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist data')
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error)
      }
    }
    fetchData()
  }, [])
  

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
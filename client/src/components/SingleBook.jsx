import { useLoaderData, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../utilities/helpers/common'

export default function SingleBook() {
  const { book } = useLoaderData()
  const navigate = useNavigate()

  // deletes book
  const handleDeleteBook = async () => {
    try {
      await axios.delete(`/api/books/${book.id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(`Book deleted`)
      navigate('/wishlist')
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }
  
  return (
    <>
      <div className='single-book'>
        <h1>{book.title} ({book.publication_year})</h1>
        <img src={book.image} alt={book.title}/>
        <h3>Author: {book.author}</h3>
        <h3>Genres: {book.genres.map((genre) => genre.name).join(', ')}</h3>
      </div>
      <div className='move'>
        <Link to={`/books/${book.id}/edit`} className="button medium edit">Edit</Link>
        <button onClick={ handleDeleteBook} className='button medium delete'>Delete</button>
      </div>
    </>
  )
}
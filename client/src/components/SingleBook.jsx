

import { useLoaderData } from 'react-router-dom'


export default function SingleBook() {
  const { book } = useLoaderData()
  
  return (
    <>
      <h2>{book.title} ({book.publication_year})</h2>
      <img src={book.image} alt={`Image of ${book.title}`}/>
      <h3>Genres: {book.genres.map((genre) => genre.name).join(', ')}</h3>
      <h3>Author: {book.author}</h3>
    </>
  )
}
import { useState } from "react"
import { useLoaderData, useNavigate } from 'react-router-dom'
import { getToken } from "../utilities/helpers/common"
import axios from "axios"

export default function CreateBook() {
  const genres = useLoaderData()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('') 

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication_year: '',
    image: '',
    genres: [],
  })

  function handleChange(e) {
    const { name, value } = e.target
    // Check if the entered value is a valid positive number
    if (name === 'publication_year' && (isNaN(value) || parseInt(value) < 0)) {
      // If not a valid positive number, set it to 0
      setFormData({ ...formData, [name]: 0 })
      // Set an error message
      setErrorMessage('Publication date must be a valid year')
    } else {
      setFormData({ ...formData, [name]: value })
      // Clear error message when a valid value is entered
      setErrorMessage('')
    }
  }

  function handleGenres(e) {
    const selectedOptions = e.target.selectedOptions
    const selectedGenreIds = Array.from(selectedOptions, option => parseInt(option.value, 10))
    setFormData({ ...formData, genres: selectedGenreIds })
    console.log('-->', selectedGenreIds)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/books/', formData, {
        validateStatus: () => true,
        headers:{
          Authorization:`Bearer ${getToken()}`
        }
      })
      if (res.status === 201) {
        console.log('Book added successfully')
        const bookId = res.data.id
        navigate(`/books/${bookId}`)
      } else {
        console.error('Error adding book:', res.data)
      }
    } catch (error) {
      console.error('Error adding book:', error)
      setErrorMessage('Oops! An error occurred while adding the book.')
    }   
  }

  return (
    <>
      <h1>Create Entry</h1>
      <form method="POST" className="createform" onSubmit={handleSubmit}>
        <div className="formstlying">

          <label hidden htmlFor="title"></label>
          <input className="field" type="text" name="title" placeholder='Title' onChange={handleChange} value={formData.title} /><br /><br />

          <label hidden htmlFor="author"></label>
          <input className="field" type="text" name="author" placeholder='Author' onChange={handleChange} value={formData.author}></input><br /><br />

          <label hidden htmlFor="publication_year"></label>
          <input className="field" type="number" name="publication_year" placeholder='Publication Year' onChange={handleChange} value={formData.publication_year} /><br /><br />

          <label hidden htmlFor="image"></label>
          <input className="field" type="text" name="image" placeholder='Image URL' onChange={handleChange} value={formData.image} /><br /><br />
          
          <label hidden htmlFor="status"></label>
          <select className="" name="status" value={formData.status} onChange={handleChange}>
            <option value='' disabled>Select Category</option>
            <option value="wishlist">Wishlist</option>
            <option value="currently-reading">Currently Reading</option>
            <option value="finished">Finished</option>
          </select><br /><br />

          <label hidden htmlFor="genres"></label>
          <select className="" name="genres" value={formData.genres} onChange={handleGenres} multiple>
            <option value='' disabled>Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select><br /><br />
            
          <button className="button" type="submit">Create</button><br />

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

      </form>
    </>
  )
}

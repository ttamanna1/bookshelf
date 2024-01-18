import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { getToken } from "../utilities/helpers/common"


export default function EditBook() {
  const genres = useLoaderData()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('') 
  const { bookId } = useParams()
  console.log('Book ID:', bookId)

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication_year: '',
    image: '',
    genres: [],
  })

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const res = await axios.get(`/api/books/${bookId}`)
        const bookData = res.data
        setFormData({
          title: bookData.title,
          author: bookData.author,
          publication_year: bookData.publication_year,
          image: bookData.image,
          genres: bookData.genres.map((genre) => genre.id),
        })
      } catch (error) {
        console.error("Error fetching book data:", error)
      }
    }
    getSingleBook()
  }, [bookId])

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
      const res = await axios.put(`/api/books/${bookId}/`, formData, {
        validateStatus: () => true,
        headers:{
          Authorization:`Bearer ${getToken()}`
        }
      })
      if (res.status === 200) {
        console.log('Book edited successfully')
        navigate(`/books/${bookId}`)
      } else {
        console.error('Error editing book:', res.data)
      }
    } catch (error) {
      console.error('Error editing book:', error)
      setErrorMessage('Oops! An error occurred while editing the book.')
    }   
  }

  return (
    <>
      <div className="page">
        <h1>Edit Entry</h1>
        <form method="POST" className="form" onSubmit={handleSubmit}>
        <div className="formstlying border">

          <label hidden htmlFor="title"></label>
          <input className="field" type="text" name="title" placeholder='Title' onChange={handleChange} value={formData.title} /><br /><br />

          <label hidden htmlFor="author"></label>
          <input className="field" type="text" name="author" placeholder='Author' onChange={handleChange} value={formData.author}></input><br /><br />

          <label hidden htmlFor="publication_year"></label>
          <input className="field" type="number" name="publication_year" placeholder='Publication Year' onChange={handleChange} value={formData.publication_year} /><br /><br />

          <label hidden htmlFor="image"></label>
          <input className="field" type="text" name="image" placeholder='Image URL' onChange={handleChange} value={formData.image} /><br /><br />

          <label hidden htmlFor="status"></label>
          <select className="status-field" name="status" value={formData.status} onChange={handleChange}>
            <option value='' disabled>Select Category</option>
            <option value="wishlist">Wishlist</option>
            <option value="currently-reading">Currently Reading</option>
            <option value="finished">Finished</option>
          </select><br /><br />

          <label hidden htmlFor="genres"></label>
          <select className="multi-select" name="genres" value={formData.genres} onChange={handleGenres} multiple>
            <option value='' disabled>Select Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id} className="select">
                {genre.name}
              </option>
            ))}
          </select>
          <p className="instructions">Hold down “Control”, or “Command” on a Mac, to select more than one.</p><br /><br />

          <div className="row">
            <div className="col-md-8">
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-end">
              <button className="button" type="submit">Edit</button>
            </div>
          </div><br />

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

      </form>
      </div>
    </>
  )
}
import { useEffect, useState } from "react"
import { Form, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import axios from "axios"


export default function CreateBook() {
  const genres = useLoaderData()
  const res = useActionData()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {

    if (res?.status === 201) {
      console.log('created successfully')
      navigate(`/books/${res.data.id}`)
    }
  }, [res, navigate])

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication_year: '',
    image: '',
    genres: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/books/', formData)
      if (response.status === 201) {
        console.log('Book created successfully:', response.data)
        navigate(`/books/${response.data.id}`)
      } else {
        console.error('Failed to create book:', response.data)
        setErrorMessage('Failed to create book. Please try again.')
      }
    } catch (error) {
      console.error('Error creating book:', error)
      setErrorMessage('Failed to create book. Please try again.')
    }
  }

  return (
    <>
      <Form method="post" className="createform" onSubmit={handleSubmit} >
        <div className="formstlying">

          <label hidden htmlFor="title"></label>
          <input className="createtitle" type="text" name="title" placeholder='Title' onChange={handleChange} value={formData.title} /><br />

          <label hidden htmlFor="author"></label>
          <input className="" type="text" name="author" placeholder='Author' onChange={handleChange} value={formData.author}></input><br />

          <label hidden htmlFor="publication_year"></label>
          <input className="" type="number" name="publication_year" placeholder='Publication Year' onChange={handleChange} value={formData.publication_year} /><br />

          <label hidden htmlFor="image"></label>
          <input className="" type="text" name="image" placeholder='Image' onChange={handleChange} value={formData.image} /><br />

          <label hidden htmlFor="genres"></label>
          <select className="" name="genres" onChange={handleChange} value={formData.genres} >
            <option value=''>Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select><br /><br />

          <div className="row">
            <div className="col-md-8">
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-end">
              <button className="btn btn-primary createbtn" type="submit">Create</button>
            </div>
          </div><br />

          {res && <p className="dangerincreate">{res.data.message}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

      </Form>
    </>

  )
}

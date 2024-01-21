export async function getAllBooks() {
  const res = await fetch('/api/books')
  console.log(res)
  return res.json()
}

export async function getGenres() {
  const res = await fetch('/api/genres/')
  console.log(res)
  return res.json()
}

export async function getSingleBook(id) {
  const res = await fetch(`/api/books/${id}/`)
  console.log(res)
  return res.json()
}

export async function getBookAndGenres(id) {
  try {
    const [book, genres] = await Promise.all([
      getSingleBook(id),
      getGenres(),
    ])
    return { book, genres}
  } catch (error) {
    console.error('Error loading data:', error)
    throw error
  }
}
export async function getAllBooks() {
  const res = await fetch('/api/books')
  console.log(res)
  return res.json()
}

export async function getSingleBook(id) {
  const res = await fetch(`/api/books/${id}`)
  console.log(res)
  return res.json()
}
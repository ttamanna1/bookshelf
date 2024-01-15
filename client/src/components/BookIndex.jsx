import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BookIndex() {
  const books = useLoaderData()

  return (
    <>
    {books.sort((a, b) => a.title < b.title ? -1 : 1).map(book => {
          const { id, title, image, author } = book
          return (
              <Link key={id} to={`/recipes/${id}`} className="card-layout">
                <div className="card" style={{width: '20rem'}}>
                  <img className="card-img-top" src={image} alt={title} style={{height: '150px', objectFit: 'cover'}}/>
                  <div className="card-body">
                    <h5 className="text-center bold card-title">{title}</h5>
                    <p className="text-center card-text">Author: {author}</p>
                  </div>
                </div> 
              </Link>
          )
        })}
    </>
  )
}

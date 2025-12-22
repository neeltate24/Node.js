import useFetch from "../useFetch";

const BooksByAuthor = ({ author }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:5000/books/author/${author}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Books by {author}</h2>
      <ul>
        {data?.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BooksByAuthor;

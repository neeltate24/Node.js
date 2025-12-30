import useFetch from "../useFetch";

const Books = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/books");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Books List</h2>

      <ul>
        {data.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author} ({book.publishedYear}
            )
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;

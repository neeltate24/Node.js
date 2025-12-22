import useFetch from "../useFetch.jsx";

const Books = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/books");

  console.log(data, loading, error);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {data?.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Books;

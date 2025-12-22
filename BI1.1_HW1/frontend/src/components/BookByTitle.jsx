import useFetch from "../useFetch";

const BookByTitle = ({ title }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:5000/books/${title}`
  );

  console.log(data);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return data ? (
    <div>
      <h2>{data.title}</h2>
      <p>
        <strong>Author:</strong> {data.author}
      </p>
      <p>
        <strong>Country:</strong> {data.country}
      </p>
      <p>
        <strong>Published Year:</strong> {data.publishedYear}
      </p>
      <p>
        <strong>Rating:</strong> {data.rating}
      </p>
      <p>
        <strong>Language:</strong> {data.language}
      </p>
      <p>
        <strong>Genre:</strong> {data.genre?.join(", ")}
      </p>
      <p>
        <strong>Summary:</strong> {data.summary}
      </p>
    </div>
  ) : (
    loading && <p>Loading...</p>
  );
};

export default BookByTitle;

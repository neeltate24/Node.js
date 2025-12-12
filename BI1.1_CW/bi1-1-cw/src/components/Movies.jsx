import useFetch from "../useFetch.jsx";

const Movies = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/movies");

  console.log(data, loading, error);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <ul>
        {data?.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

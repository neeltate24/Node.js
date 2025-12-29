import useFetch from "../useFetch";

const MovieByTitle = ({ title }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:5000/movies/${title}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>Director: {data.director}</p>
      <p>Country: {data.country}</p>
      <p>Release Year: {data.releaseYear}</p>
      <p>Rating: {data.rating}</p>
      <p>Actors: {data.actors?.join(", ")}</p>
      <p>Awards: {data.awards}</p>
      <p>Plot: {data.plot}</p>
      <img src={data.posterUrl} alt="Poster" width="200" />
    </div>
  );
};

export default MovieByTitle;

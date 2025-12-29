import Movies from "./components/Movies";
import MovieByTitle from "./components/MovieByTitle";
import AddMovieForm from "./components/AddMovieForm";

export default function App() {
  return (
    <main>
      <AddMovieForm />
      <Movies />
      <MovieByTitle title="ZNMD" />
    </main>
  );
}

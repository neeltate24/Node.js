import "./App.css";
import Movies from "./components/Movies.jsx";
import MoviesByTitle from "./components/MovieByTitle.jsx";

export default function App() {
  return (
    <main>
      <Movies />
      <MoviesByTitle title="Bajrangi Bhaijaan" />
    </main>
  );
}

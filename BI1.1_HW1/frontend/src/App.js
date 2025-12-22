import Books from "./components/Books";
import BookByTitle from "./components/BookByTitle";
import BooksByAuthor from "./components/BooksByAuthor";

function App() {
  return (
    <div>
      <Books />
      <BookByTitle title="Shoe Dog" />
      <BooksByAuthor author="Harper Lee" />
    </div>
  );
}

export default App;

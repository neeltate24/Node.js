import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

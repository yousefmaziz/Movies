import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Categories from "./pages/Categories";
import Watchlist from "./pages/Watchlist";
import { Toaster } from "react-hot-toast";
import Cast from "./pages/Cast";

function App() {
  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #3f3f46",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id/cast/:castId" element={<Cast />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;

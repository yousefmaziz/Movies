import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
const API_URL = import.meta.env.VITE_API_URL;

const categories = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Thriller",
  "Crime",
  "Mystery",
  "Fantasy",
];

export default function Categories() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [movies, setMovies] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const getMovies = async () => {
    try {
      let url = `${API_URL}/movies`;
      if (activeCategory !== "All") url += `?category=${activeCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data as any[]);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="h-max bg-[#0c0c0e] text-white pt-16 pb-16"
    >
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 mt-6">
          <span className="h-3.5 w-1 rounded-full bg-red-500" />
          <h1 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Browse Categories
          </h1>
          <span className="text-xs text-zinc-600 font-mono ml-auto">
            {movies.length} titles
          </span>
        </div>

        {/* Category Swiper */}
        <div className="mb-7 relative">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={8}
            slidesPerView="auto"
            className="!pb-0.5"
          >
            {categories.map((category) => (
              <SwiperSlide key={category} style={{ width: "auto" }}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 border border-zinc-700/50"
                  }`}
                >
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800/60 mb-7" />

        {/* Grid */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="min-h-screen bg-[#0c0c0e] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-zinc-700 border-t-red-500 animate-spin" />
              <p className="text-zinc-500 text-sm">Loading…</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

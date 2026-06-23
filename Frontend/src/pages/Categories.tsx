import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

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
  const [movies, setMovies] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const getMovies = async () => {
    try {
      let url = "http://localhost:3001/movies";
      if (activeCategory !== "All") url += `?category=${activeCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, [activeCategory]);

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="min-h-screen bg-[#0c0c0e] text-white pt-16 pb-16"
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
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-600">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <path d="M7 8h10M7 12h6" />
            </svg>
            <p className="text-sm">No movies in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

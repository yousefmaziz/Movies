import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToWatchlist } from "../utils/watchlistUtils.ts";
const API_URL = import.meta.env.VITE_API_URL;

interface Movie {
  _id: string;
  title: string;
  description: string;
  posterUrl: string;
  rating: number;
  releaseYear: number;
  category: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const exists = watchlist.some((item: Movie) => item._id === movie._id);
    setIsSaved(exists);
  }, [movie._id]);

  function handleDetailsClick() {
    return navigate(`${API_URL}/movies/${movie._id}`);
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800/60 transition-all duration-200 hover:border-zinc-600/80 hover:shadow-lg hover:shadow-black/40">
      {/* Poster */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: "2/3" }}
        onClick={handleDetailsClick}
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />

        {/* Rating badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5">
          <span className="text-yellow-400 text-[10px]">★</span>
          <span className="text-white text-[11px] font-semibold">
            {movie.rating}
          </span>
        </div>

        {/* Watchlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToWatchlist(movie, setIsSaved);
          }}
          className={`absolute top-2 right-2 rounded-md p-1.5 backdrop-blur-sm transition-all duration-150 ${
            isSaved
              ? "bg-red-500 text-white"
              : "bg-black/60 text-zinc-300 hover:bg-black/80 hover:text-white"
          }`}
        >
          <BiHeart className="text-sm" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2
            className="text-sm font-semibold text-white leading-snug line-clamp-1 cursor-pointer hover:text-red-400 transition-colors"
            onClick={handleDetailsClick}
          >
            {movie.title}
          </h2>
          <span className="shrink-0 text-[11px] text-zinc-500 font-mono mt-0.5">
            {movie.releaseYear}
          </span>
        </div>

        <span className="inline-block rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wide mb-2">
          {movie.category}
        </span>

        <p className="text-[11px] leading-relaxed text-zinc-500 line-clamp-2">
          {movie.description}
        </p>

        <button
          onClick={handleDetailsClick}
          className="mt-3 w-full rounded-lg bg-zinc-800 hover:bg-zinc-700 py-1.5 text-xs font-medium text-zinc-200 transition-colors cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

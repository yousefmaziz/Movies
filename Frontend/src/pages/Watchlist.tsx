import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Movie {
  director: import("react/jsx-runtime").JSX.Element;
  _id: string;
  title: string;
  description: string;
  posterUrl: string;
  rating: number;
  releaseYear: number;
  category: string;
}

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMovies(watchlist);
  }, []);

  const removeFromWatchlist = (movieId: string) => {
    const updated = movies.filter((m) => m._id !== movieId);
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setMovies(updated);
    toast.success("Removed from watchlist");
  };

  if (movies.length === 0) {
    return (
      <div
        style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
        className="min-h-screen bg-[#0c0c0e] flex flex-col items-center justify-center gap-3"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-zinc-600"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <p className="text-zinc-500 text-sm">Your watchlist is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-xs text-zinc-300 transition-colors"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="h-full bg-[#0c0c0e] text-white pt-18 pb-16"
    >
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <span className="h-3.5 w-1 rounded-full bg-red-500" />
          <h1 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            My Watchlist
          </h1>
          <span className="text-xs text-zinc-600 font-mono ml-auto">
            {movies.length} saved
          </span>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="flex gap-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl overflow-hidden p-3 hover:border-zinc-700/60 transition-colors"
            >
              {/* Poster */}
              <div
                className="shrink-0 w-16 rounded-lg overflow-hidden cursor-pointer"
                style={{ aspectRatio: "2/3" }}
                onClick={() => navigate(`/movies/${movie._id}`)}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                      className="text-sm font-bold text-white leading-snug line-clamp-1 cursor-pointer hover:text-red-400 transition-colors"
                      onClick={() => navigate(`/movies/${movie._id}`)}
                    >
                      {movie.title}
                    </h2>

                    <div className="flex items-center gap-1 shrink-0 rounded bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5">
                      <span className="text-yellow-400 text-[10px]">★</span>
                      <span className="text-yellow-400 text-[11px] font-semibold">
                        {movie.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 font-mono">
                      {movie.releaseYear}
                    </span>
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 uppercase tracking-wide">
                      {movie.category}
                    </span>
                    {movie.director && (
                      <span className="text-[10px] text-zinc-600">
                        Dir.{" "}
                        <span className="text-zinc-400">{movie.director}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2">
                    {movie.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={() => navigate(`/movies/${movie._id}`)}
                    className="rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-[11px] font-medium text-zinc-300 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => removeFromWatchlist(movie._id)}
                    className="rounded-lg border border-zinc-700/60 hover:border-red-500/40 hover:text-red-400 px-3 py-1.5 text-[11px] font-medium text-zinc-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

type Actor = {
  castId: Key | null | undefined;
  _id: string;
  name: string;
  image: string;
  BirthDay: number;
  nationality: string;
  description: string;
};

type Movie = {
  _id: string;
  title: string;
  posterUrl: string;
  rating: number | string;
  releaseYear?: string | number;
  category?: string;
  director?: string;
  description?: string;
  trailer: string;
  cast?: Actor[];
};

export default function MovieDetails() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getMovieDetails = async () => {
    const response = await fetch(`${API_URL}/movies/${id}`);
    const data = await response.json();
    setMovie(data);
  };
  const handleCastPage = (castId: string) => {
    console.log("Navigating with Cast ID:", castId);

    navigate(`/movies/${id}/cast/${castId}`);
  };

  const handleTrailer = () => {
    console.log(movie);

    if (movie?.trailer) {
      window.open(movie.trailer, "_blank");
    } else {
      console.log("Trailer not found");
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id) getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!movie) {
    return (
      <div className="bg-[#0c0c0e] flex items-center justify-center h-200">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-zinc-700 border-t-red-500 animate-spin" />
          <p className="text-zinc-500 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="bg-[#0c0c0e] text-white pt-16 pb-16 h-200"
    >
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>

        {/* ── MAIN CARD ── */}
        <div className="flex flex-col sm:flex-row gap-7 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl overflow-hidden p-5 sm:p-6">
          {/* Poster */}
          <div className="sm:w-44 shrink-0">
            <div
              className="rounded-xl overflow-hidden"
              style={{ aspectRatio: "2/3" }}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* title row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    letterSpacing: "-0.02em",
                  }}
                  className="text-2xl sm:text-3xl font-black text-white leading-tight"
                >
                  {movie.title}
                </h1>
                <span className="shrink-0 flex items-center gap-1 rounded-lg bg-yellow-500/10 px-2.5 py-1 text-sm font-semibold text-yellow-400 border border-yellow-500/20">
                  ★ {movie.rating}
                </span>
              </div>

              {/* meta row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="rounded-md bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400 font-mono">
                  {movie.releaseYear}
                </span>
                <span className="rounded-md bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400 uppercase tracking-wide">
                  {movie.category}
                </span>
                {movie.director && (
                  <>
                    <span className="text-zinc-700 text-xs">·</span>
                    <span className="text-xs text-zinc-500">
                      Dir.{" "}
                      <span className="text-zinc-300">{movie.director}</span>
                    </span>
                  </>
                )}
              </div>

              {/* description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-5 max-w-xl">
                {movie.description}
              </p>
            </div>

            {/* action */}
            <div>
              <button
                onClick={handleTrailer}
                className="cursor-pointer flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* ── CAST ── */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-3.5 w-1 rounded-full bg-red-500" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Cast
              </h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {movie.cast.map((actor) => (
                <div
                  key={actor._id}
                  onClick={() => handleCastPage(actor._id)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-700/60 group-hover:border-zinc-500 transition-colors">
                    <img
                      src={actor.image}
                      alt={actor.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <p className="text-[11px] text-center text-zinc-500 group-hover:text-zinc-300 transition-colors leading-tight">
                    {actor.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

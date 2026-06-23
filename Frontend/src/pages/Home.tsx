import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const getMovies = async () => {
    try {
      let url = "http://localhost:3001/movies?limit=10";
      if (sort === "Highest") url += "&sortBy=rating&order=desc";
      else if (sort === "Lowest") url += "&sortBy=rating&order=asc";
      else if (sort === "Newest") url += "&sortBy=releaseYear&order=desc";
      else if (sort === "Oldest") url += "&sortBy=releaseYear&order=asc";
      if (search) url += `${url.includes("?") ? "&" : "?"}search=${search}`;

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort]);

  const averageRating =
    movies.length > 0
      ? (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(
          1,
        )
      : "0";

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="bg-[#0c0c0e] text-white min-h-screen"
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-14">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070')",
            filter: "brightness(0.18) saturate(0.6)",
          }}
        />

        {/* subtle red glow top-left */}
        <div className="absolute top-0 left-0 h-48 w-64 rounded-full bg-red-700/15 blur-[100px]" />

        {/* thin top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* LEFT: headline block */}
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400/80 mb-3">
                <span className="h-px w-5 bg-red-500/60" />
                Cinema Collection
              </span>

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  letterSpacing: "-0.02em",
                }}
                className="text-3xl md:text-4xl font-black leading-tight text-white"
              >
                Discover The
                <br />
                <span className="text-red-500">World of Cinema</span>
              </h1>

              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-sm">
                Blockbusters, timeless classics, and hidden gems — all in one
                place.
              </p>

              {/* stats row */}
              <div className="mt-5 flex items-center gap-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-white">
                    {movies.length}
                  </span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">
                    Films
                  </span>
                </div>
                <div className="h-4 w-px bg-zinc-700" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-white">
                    {averageRating}
                  </span>
                  <span className="text-xs text-zinc-500">★ avg rating</span>
                </div>
              </div>
            </div>

            {/* RIGHT: search + sort */}
            <div className="flex flex-col sm:flex-row gap-3 md:w-auto w-full">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search movies…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-56 rounded-lg border border-zinc-700/70 bg-zinc-900/80 pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-500/70 transition-colors"
                />
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-44 rounded-lg border border-zinc-700/70 bg-zinc-900/80 px-3 py-2.5 text-sm text-white outline-none focus:border-red-500/70 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Sort: Default</option>
                <option value="Highest">Highest Rated</option>
                <option value="Lowest">Lowest Rated</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0c0c0e] to-transparent" />
      </section>

      {/* ── DIVIDER ── */}
      <div className="container mx-auto px-6 lg:px-14">
        <div className="h-px bg-zinc-800/60" />
      </div>

      {/* ── MOVIES SECTION ── */}
      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-14">
          {/* section label */}
          <div className="flex items-center gap-3 mb-7">
            <span className="h-3.5 w-1 rounded-full bg-red-500" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">
              Trending Now
            </h2>
            <span className="text-xs text-zinc-600 ml-auto font-mono">
              {movies.length} titles
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {movies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <rect x="2" y="2" width="20" height="20" rx="3" />
                <path d="M7 8h10M7 12h6" />
              </svg>
              <p className="mt-3 text-sm">No movies found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

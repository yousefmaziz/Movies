import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Cast() {
  const [movie, setMovie] = useState<{ name?: string; image?: string }>({});
  const { id, castId } = useParams();

  const getMovieDetails = async () => {
    const response = await fetch(
      `http://localhost:3001/movies/${id}/cast/${castId}`,
    );
    const cast = await response.json();
    setMovie(cast);
    console.log(cast);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id) getMovieDetails();
  }, [id, castId]);
  return (
    <>
      <div
        style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
        className="min-h-screen bg-[#0c0c0e] text-white pt-16 pb-16"
      >
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-7 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl overflow-hidden p-5 sm:p-6">
            {/* Poster */}
            <div key={movie.name} className="sm:w-44 shrink-0">
              <div
                className="rounded-xl overflow-hidden"
                style={{ aspectRatio: "2/3" }}
              >
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      letterSpacing: "-0.02em",
                    }}
                    className="text-2xl sm:text-3xl font-black text-white leading-tight"
                  >
                    {movie.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

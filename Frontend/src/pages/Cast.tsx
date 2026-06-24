import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Cast() {
  const [movie, setMovie] = useState<any>({});
  const { id, castId } = useParams();

  const getMovieDetails = async () => {
    try {
      const url = `${API_URL}/movies/${id}/cast/${castId}`;

      const response = await fetch(url);

      const data = await response.json(); // ✅ هنا الحل

      console.log("Data:", data);

      setMovie(data); // ✅ صح
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && castId) getMovieDetails();
  }, [id, castId]);

  return (
    <div className="bg-[#0c0c0e] text-white pt-16 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-7 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl overflow-hidden p-5 sm:p-6">
          {/* Image */}
          <div className="sm:w-44 shrink-0">
            <div className="rounded-xl overflow-hidden aspect-[3/4]">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl font-black mb-4">{movie.name}</h1>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5 max-w-xl">
              {movie.description}
            </p>
            <p className="text-zinc-300 mb-2">
              🎂 Birth Year: {movie.BirthDay}
            </p>

            <p className="text-zinc-300 mb-2">
              🌍 Nationality: {movie.nationality}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

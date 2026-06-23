import toast from "react-hot-toast";

interface Movie {
  _id: string;
  [key: string]: any;
}

export const addToWatchlist = (
  movie: Movie,
  setIsSaved: (isSaved: boolean) => void,
) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

  const exists = watchlist.some((item: Movie) => item._id === movie._id);

  if (!exists) {
    watchlist.push(movie);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    toast.success("Added to watchlist!");

    setIsSaved(true);
  }
};

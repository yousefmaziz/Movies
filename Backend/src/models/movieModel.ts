import mongoose from "mongoose";

interface Movie {
  title: string;
  director: string;
  releaseYear: number;
  rating: number;
  description: string;
  posterUrl: string;
  category: string;
  Tralier: string;
  cast?: [
    {
      _id: string;
      name: string;
      image: string;
      BirthDay: number;
      nationality: string;
    },
  ]; // Optional field for cast members
}

const movieSchema = new mongoose.Schema<Movie>({
  title: { type: String },
  director: { type: String },
  releaseYear: { type: Number },
  rating: { type: Number },
  description: { type: String },
  posterUrl: { type: String },
  category: { type: String },
  Tralier: { type: String },
  cast: {
    type: [
      { name: String, image: String, BirthDay: Number, nationality: String },
    ],
  },
});

const movieModel = mongoose.model("movies", movieSchema);
export default movieModel;

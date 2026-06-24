import mongoose from "mongoose";

interface CastMember {
  name: string;
  image: string;
  BirthDay: number;
  nationality: string;
  description: string;
}

interface Movie {
  title: string;
  director: string;
  releaseYear: number;
  rating: number;
  description: string;
  posterUrl: string;
  category: string;
  trailer: string;
  cast: CastMember[];
}

const castSchema = new mongoose.Schema({
  name: String,
  image: String,
  BirthDay: Number,
  nationality: String,
  description: String,
});

const movieSchema = new mongoose.Schema<Movie>({
  title: String,
  director: String,
  releaseYear: Number,
  rating: Number,
  description: String,
  posterUrl: String,
  category: String,
  trailer: String,
  cast: [castSchema],
});

const movieModel = mongoose.model("movies", movieSchema);

export default movieModel;

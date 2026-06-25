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
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  BirthDay: {
    type: Number,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const movieSchema = new mongoose.Schema<Movie>({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  cast: {
    type: [castSchema],
    required: true,
    validate: {
      validator: (arr: CastMember[]) => arr.length > 0,
      message: "At least one cast member is required",
    },
  },
});

const movieModel = mongoose.model("movies", movieSchema);

export default movieModel;

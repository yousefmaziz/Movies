import { Router } from "express";
import movieModel from "../models/movieModel";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const movies = await movieModel.create(req.body);

    res.status(201).json(movies);
  } catch (err) {
    res.status(400).json({
      message: "Error creating movie",
      error: err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, category, sortBy, order, limit } = req.query;

    const query: any = {};
    const sortOption: any = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (sortBy) {
      sortOption[sortBy as string] = order === "asc" ? 1 : -1;
    }

    const limitValue = Number(limit) || 20;

    const movies = await movieModel
      .find(query)
      .sort(sortOption)
      .limit(limitValue);

    return res.status(200).json(movies);
  } catch (error: any) {
    console.error("GET /movies ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await movieModel.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json(movie);
  } catch (error: any) {
    console.error("GET /movies/:id ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id/cast", async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await movieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie.cast);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching movie",
      error: err,
    });
  }
});
router.get("/:id/cast/:castId", async (req, res) => {
  try {
    const { id, castId } = req.params;

    const movie = await movieModel.findById(id);

    console.log("Requested Cast ID:", castId);

    movie?.cast?.forEach((actor) => {
      console.log("Actor ID:", actor._id.toString());
    });

    const cast = movie?.cast?.find((actor) => actor._id.toString() === castId);

    if (!cast) {
      return res.status(404).json({
        message: "Cast not found",
      });
    }

    res.json(cast);
  } catch (err) {
    console.log(err);
  }
});
export default router;

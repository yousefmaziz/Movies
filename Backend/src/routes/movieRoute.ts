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
    let sortOption: any = {};

    if (sortBy) {
      sortOption = {
        [sortBy as string]: order === "asc" ? 1 : -1,
      };
    }

    if (search) {
      query.title = {
        // علشان يجيب ااي فيلم يحتوي الكلمة اللي المستخدم كتبها في البحث
        $regex: search,
        // علشان البحث مايكون حساس لحالة الحروف يعني يجيب "Inception" لو المستخدم كتب "inception" او "INCEPTION"
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }
    const limitValue = limit ? parseInt(limit as string) : 20;

    const movies = await movieModel
      .find(query)
      .sort(sortOption)
      .limit(limitValue);

    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching movies",
      error: err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const SelectedMovie = await movieModel.findById(id);
    res.status(200).json(SelectedMovie);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching movie",
      error: err,
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

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const cast = movie.cast?.find((actor) => actor._id.toString() === castId);

    if (!cast) {
      return res.status(404).json({
        message: "Cast not found",
      });
    }

    res.status(200).json(cast);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching cast",
      error: err,
    });
  }
});
export default router;

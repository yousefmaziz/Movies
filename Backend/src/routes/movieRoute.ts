import { Router } from "express";
import movieModel from "../models/movieModel";

const router = Router();

// إنشاء فيلم
router.post("/", async (req, res) => {
  try {
    const movie = await movieModel.create(req.body);
    console.log(req.body);
    return res.status(201).json(movie);
  } catch (err) {
    return res.status(400).json({
      message: "Error creating movie",
      error: err,
    });
  }
});

// جلب كل الأفلام
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

    const movies = await movieModel
      .find(query)
      .sort(sortOption)
      .limit(Number(limit) || 20);

    return res.status(200).json(movies);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// جلب ممثل معين
router.get("/:id/cast/:castId", async (req, res) => {
  try {
    const { id, castId } = req.params;

    const movie = await movieModel.findById(id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const actor = movie.cast.find(
      (item: any) => item._id.toString() === castId,
    );

    if (!actor) {
      return res.status(404).json({
        message: "Cast not found",
      });
    }

    return res.status(200).json(actor);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
// جلب جميع الممثلين لفيلم
router.get("/:id/cast", async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie.cast || []);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// جلب فيلم بالـ id (آخر Route)
router.get("/:id", async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    return res.status(200).json(movie);
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export default router;

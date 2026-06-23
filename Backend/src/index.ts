import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import movieRoutes from "./routes/movieRoute";
const app = express();
const PORT = 3001;

mongoose
  .connect("mongodb://localhost:27017/Movies")
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

app.use("/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

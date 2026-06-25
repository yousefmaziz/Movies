import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import movieRoutes from "./routes/movieRoute";
import dotenv from "dotenv";

dotenv.config();

const app = express();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("NODE_ENV:", process.env.NODE_ENV);

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

start();

export default app;

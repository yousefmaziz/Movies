import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import movieRoutes from "./routes/movieRoute";
import dotenv from "dotenv";

dotenv.config();

const app = express();
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("NODE_ENV:", process.env.NODE_ENV);
mongoose
  .connect(process.env.MONGO_URI || process.env.MONGODB_URI || "")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("FULL MONGODB ERROR:");
    console.error(err);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

app.use("/movies", movieRoutes);

// شغل السيرفر محلياً فقط
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

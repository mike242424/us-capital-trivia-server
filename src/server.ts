import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Highscore, { HighscoreDocument } from "./models/Highscore";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

mongoose
  // .connect(mongoURI)
  .connect(mongoURI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(express.json());

app.get("/highscores", async (req: Request, res: Response) => {
  try {
    const highscores: HighscoreDocument[] = await Highscore.find().sort({
      score: -1,
    });

    res.status(200).json(highscores);
  } catch (err) {
    console.error("Error fetching highscores:", err);
    res.status(500).json({ error: "Failed to fetch highscores" });
  }
});

app.post("/highscores", async (req: Request, res: Response) => {
  const { initials, score } = req.body;

  try {
    const newHighscore: HighscoreDocument = new Highscore({
      initials,
      score,
    });

    await newHighscore.save();

    res.status(201).json({ message: "Highscore added successfully" });
  } catch (err) {
    console.error("Error adding highscore:", err);
    res.status(500).json({ error: "Failed to add highscore" });
  }
});

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});

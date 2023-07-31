import { Document, Schema, model } from "mongoose";

export interface HighscoreDocument extends Document {
  initials: string;
  score: number;
}

const HighscoreSchema = new Schema<HighscoreDocument>({
  initials: { type: String, required: true },
  score: { type: Number, required: true },
});

const Highscore = model<HighscoreDocument>("Highscore", HighscoreSchema);

export default Highscore;

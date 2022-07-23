import mongoose from "mongoose";
import random from "mongoose-random";

const QuoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  character: { type: String, required: true },
  anime: { type: String, required: true },
  animePhotoURL: String,
});
QuoteSchema.plugin(random, { path: "r" });

export default mongoose.model("Quote", QuoteSchema);

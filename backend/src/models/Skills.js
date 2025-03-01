import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: { type: String, trim: true, maxlenght: 20, required: true },
  category: {
    type: String,
    trim: true,
    maxlenght: 20,
    required: true,
    index: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  urlImage: { type: String },
  public_id: { type: String },
});

export default mongoose.model("Skill", skillSchema);

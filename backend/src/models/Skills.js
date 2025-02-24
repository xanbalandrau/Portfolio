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

// Middleware pour limiter à 6 skills
skillSchema.pre("save", async function (next) {
  const Skill = mongoose.model("Skill");

  const count = await Skill.countDocuments();
  if (count > 6) {
    const error = new Error("Vous ne pouvez pas ajouter plus de 6 skills.");
    return next(error);
  }

  next();
});

export default mongoose.model("Skill", skillSchema);

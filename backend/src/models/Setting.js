import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  preferences: { type: Object, default: {} },
  cookies: { type: Object, default: {} },
  theme: {
    type: String,
    enum: ["LightTheme", "DarkTheme"],
    default: "LightTheme",
  },
  skill: {
    type: String,
    enum: ["card", "circle"],
    default: "card",
  },
});

export default mongoose.model("Settings", settingsSchema);

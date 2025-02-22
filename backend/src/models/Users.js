import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlenght: 20, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    skill: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    settings: { type: mongoose.Schema.Types.ObjectId, ref: "Settings" },
  },
  { timestamps: true }
);

// Middleware for limiting the number of admin by 1
userSchema.pre("save", async function (next) {
  if (this.role === "admin" && (this.isNew || this.isModified("role"))) {
    const adminCount = await mongoose
      .model("User")
      .countDocuments({ role: "admin" });
    if (adminCount >= 1) {
      return next(new Error("Only one admin is allowed"));
    }
  }
  next();
});

export default mongoose.model("User", userSchema);

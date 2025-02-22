import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./src/config/db.js";
import morganMiddleware from "./src/middleware/morganMiddleware.js";
import userRoutes from "./src/routes/auth.routes.js";
import userSkill from "./src/routes/skill.routes.js";
import userSetting from "./src/routes/setting.routes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

connectDB();

app.use("/api/auth", userRoutes);
app.use("/api/skill", userSkill);
app.use("/api/setting", userSetting);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});

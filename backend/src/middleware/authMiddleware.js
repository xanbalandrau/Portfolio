import jwt from "jsonwebtoken";
import User from "../models/Users.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "").trim();
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized User, Token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized token " });
    }

    const user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying token", error: error.message });
  }
};

export const protectAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying token admin", error: error.message });
  }
};

import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "4h" }
  );
};

export const generateTokenFast = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};

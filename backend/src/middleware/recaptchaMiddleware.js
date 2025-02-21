import axios from "axios";
import asyncHandler from "express-async-handler";
import qs from "qs";

const verifyRecaptcha = asyncHandler(async (req, res, next) => {
  const { recaptcha } = req.body;

  if (!recaptcha) {
    return res.status(400).json({ message: "Recaptcha is required" });
  }
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      qs.stringify({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptcha,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.data.success) {
      return res.status(400).json({ message: "Invalid recaptcha" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying recaptcha" });
  }
});

export default verifyRecaptcha;

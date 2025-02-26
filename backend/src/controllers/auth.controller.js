import User from "../models/Users.js";
import Settings from "../models/Setting.js";
import bcrypt from "bcrypt";
import sendEmail from "../services/emailService.js";
import jwt from "jsonwebtoken";

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/authValidation.js";
import {
  generateToken,
  generateTokenFast,
} from "../middleware/tokenGenerator.js";
import { deleteSkillWithUser } from "./skill.controller.js";

const API_URL = process.env.API_URL;
const API_URL_FRONT = process.env.API_URL_FRONT;

export const createUser = async (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { name, email, password, role } = value;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next({ status: 400, message: "User already exists" });
    }

    const salRound = 10;
    const hashedPassword = await bcrypt.hash(String(password), salRound);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const newSettings = new Settings({ userId: newUser.id });
    await newSettings.save();

    newUser.settings = newSettings.id;
    await newUser.save();

    const token = generateTokenFast(newUser);
    const verifyUrl = `${API_URL}/api/auth/verify/${token}`;

    const verif = /* HTML */ `
      <h1 style="color: #3498db;">Vérification de compte</h1>
      <p>Cliquez sur le lien ci-dessous pour vérifier votre compte.:</p>
      <a href="${verifyUrl}" style="color: #2ecc71;">Vérifier mon compte </a>
      <p>Si vous n'avez pas demandé cette Vérification, ignorez cet e-mail.</p>
    `;

    await sendEmail(email, "Vérification de compte", verif);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { email, password } = value;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return next({ status: 401, message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return next({ status: 403, message: "Account not verified" });
    }

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.removeHeader("Authorization");

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const getUserSkill = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("skill");
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    res.status(200).json({ success: true, skills: user.skill });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user.skill && user.skill.length > 0) {
      for (let skillId of user.skill) {
        await deleteSkillWithUser(skillId, id);
      }
    }

    if (user.settings) {
      await Settings.findByIdAndDelete(user.settings);
    }

    const userdelete = await User.findByIdAndDelete(id);
    if (!userdelete) {
      return next({ status: 404, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return next({ status: 404, message: "User not found" });

    if (user.isVerified)
      return next({ status: 400, message: "User already verified" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "✅ Email verified !" });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { error, value } = forgotPasswordSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { email } = value;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return next({ status: 404, message: "User with this email not found" });

    const token = generateTokenFast(user);

    const resetUrl = `${API_URL_FRONT}/reset-password`;

    await sendEmail(email, "Password Reset Request", htmlContent);

    res.json({ message: "Email sent for password reset" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { error, value } = resetPasswordSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { password } = value;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return next({ status: 404, message: "User with this token not found" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

import User from "../models/Users.js";
import bcrypt from "bcrypt";

import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { generateToken } from "../middleware/tokenGenerator.js";
import { deleteSkillWithUser } from "./skill.controller.js";

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

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
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

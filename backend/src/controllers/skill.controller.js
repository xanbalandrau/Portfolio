import Skill from "../models/Skills.js";
import User from "../models/Users.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import {
  addSkillSchema,
  updateSkillSchema,
} from "../validations/skillValidation.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createSkill = async (req, res, next) => {
  const { error, value } = addSkillSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { title, category, level } = value;
  const userId = req.user.id;
  try {
    if (!req.file) {
      return next({ status: 400, message: "Image is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "Protfolio-skills",
    });

    let urlImage = uploadResult.secure_url;
    let public_id = uploadResult.public_id;

    fs.unlinkSync(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    const newSkill = await Skill.create({
      title,
      category,
      level,
      urlImage,
      public_id,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { skill: newSkill } },
      { new: true }
    ).select("-password");

    res.status(201).json({ message: "Skill created successfully", user });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  const userId = req.user.id;
  const skillId = req.params.id;
  try {
    const skill = await Skill.findByIdAndDelete(skillId);
    if (!skill) {
      return next({ status: 404, message: "Skill not found" });
    }

    if (skill.public_id) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.destroy(
          skill.public_id
        );

        if (cloudinaryResponse.result !== "ok") {
          throw new Error("Error deleting image on Cloudinary");
        }
      } catch (cloudinaryError) {
        console.error("Error Cloudinary :", cloudinaryError);
        return next({
          status: 500,
          message: "Error deleting image on Cloudinary",
          error: cloudinaryError,
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { skill: skill.id } },
      { new: true }
    ).select("-password");

    await user.save();
    res.status(200).json({ message: "Skill deleted successfully", user });
  } catch (error) {
    next(error);
  }
};

export const deleteSkillWithUser = async (skillId, userId) => {
  try {
    const skill = await Skill.findByIdAndDelete(skillId);
    if (!skill) {
      throw new Error("Skill not found");
    }

    if (skill.public_id) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.destroy(
          skill.public_id
        );

        if (cloudinaryResponse.result !== "ok") {
          throw new Error("Error deleting image on Cloudinary");
        }
      } catch (cloudinaryError) {
        console.error("Error Cloudinary :", cloudinaryError);
        throw new Error("Error deleting image on Cloudinary");
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { skill: skill.id } },
      { new: true }
    ).select("-password");

    await user.save();
    return { message: "Skill deleted successfully", user };
  } catch (error) {
    throw error;
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { error, value } = updateSkillSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { title, category, level } = value;
    const skillId = req.params.id;

    let urlImage = req.body.urlImage;
    let public_id = req.body.public_id;

    console.log(req.body);

    if (req.file) {
      if (req.body.public_id) {
        try {
          await cloudinary.uploader.destroy(req.body.public_id);
          console.log("Deleted previous image successfully");
        } catch (error) {
          console.error("Error deleting previous image on Cloudinary:", error);
        }
      }

      // upload if there is a new image
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "Protfolio-skills",
      });

      fs.unlinkSync(req.file.path, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });

      urlImage = uploadResult.secure_url;
      public_id = uploadResult.public_id;
    }
    const skill = await Skill.findByIdAndUpdate(
      skillId,
      {
        title,
        category,
        level,
        urlImage,
        public_id,
      },
      { new: true }
    );

    if (!skill) {
      return next({ status: 404, message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill updated successfully", skill });
  } catch (error) {
    next(error);
  }
};

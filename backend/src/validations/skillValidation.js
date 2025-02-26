import Joi from "joi";

export const addSkillSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  category: Joi.string().min(3).max(20).required(),
  level: Joi.string().valid("Beginner", "Intermediate", "Advanced").required(),
});

export const updateSkillSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  category: Joi.string().min(3).max(20).required(),
  level: Joi.string().valid("Beginner", "Intermediate", "Advanced").required(),
  imageFile: Joi.any(),
  public_id: Joi.string(),
});

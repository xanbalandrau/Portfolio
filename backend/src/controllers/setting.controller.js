import Setting from "../models/Setting.js";
import User from "../models/Users.js";

export const allSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("settings");
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const setting = user.settings;

    return res.status(200).json({ success: true, setting });
  } catch (error) {
    next(error);
  }
};

export const updateTheme = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { theme } = req.body;

    const user = await User.findById(userId).populate("settings");
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const settingId = user.settings._id;

    const updatedSetting = await Setting.findOneAndUpdate(
      { _id: settingId },
      { theme },
      { new: true }
    );
    return res.status(200).json({ success: true, setting: updatedSetting });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { skill } = req.body;

    const user = await User.findById(userId).populate("settings");
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const settingId = user.settings._id;

    const updatedSetting = await Setting.findOneAndUpdate(
      { _id: settingId },
      { skill },
      { new: true }
    );
    return res.status(200).json({ success: true, setting: updatedSetting });
  } catch (error) {
    next(error);
  }
};

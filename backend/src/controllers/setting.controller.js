import Setting from "../models/Setting.js";
import User from "../models/Users.js";

export const allSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const setting = await Setting.findOne({ userId });
    return res.status(200).json({ success: true, setting });
  } catch (error) {
    next(error);
  }
};

export const updateTheme = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const theme = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const updatedSetting = await Setting.findOneAndUpdate(
      { userId },
      { theme },
      { new: true }
    );
    return res.status(200).json({ success: true, setting: updatedSetting });
  } catch (error) {
    next(error);
  }
};

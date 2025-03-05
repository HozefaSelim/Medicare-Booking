import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update", err });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete", err });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    res.status(200).json({
      status: true,
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "No user Found", err });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      status: true,
      message: "Users Found",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "No users Found", err });
  }
};

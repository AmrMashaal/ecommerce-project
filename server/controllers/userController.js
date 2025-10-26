import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  try {
    const users = await User.find()
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments();

    res.status(200).json({
      users,
      page: page,
      totalPages: Math.ceil(total / limit),
      total: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error deleting user:", error.message);
  }
};

export const getMe = async (req, res) => {
  try {
    const userLastLogin = new Date();
    await User.findByIdAndUpdate(req.user._id, { lastLogin: userLastLogin });

    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findById(id);
    const usernameExists = await User.findOne({ username: updates.username });
    const emailExists = await User.findOne({ email: updates.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (usernameExists && usernameExists._id.toString() !== id) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (emailExists && emailExists._id.toString() !== id) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (
      !updates.username.match(
        /^(?!.*\.\.)(?!.*\.$)(?=.*[a-zA-Z])(?![_.])[a-zA-Z0-9._]+$/
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid username format. It must be alphanumeric and can include dots.",
      });
    }

    user.username = updates.username || user.username;
    user.email = updates.email || user.email;
    user.role = updates.role || user.role;
    user.isVerified = updates.isVerified;
    user.address = {
      governorate: updates.governorate,
      city: updates.city,
      street: updates.street,
    };

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role, Otp } = require("../models");
const { Op, where } = require("sequelize");
const validate = require("../validators/validateAuth");
const { requestOtp } = require("../service/otp");
const user = require("../../test_sequelize/models/user");
// REGISTER
const register = async (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  console.log("test",firstname, lastname, email, password, username);

  const { valid, errors } = validate.validateRegister(req.body);

  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const defaultRole = await Role.findOne({ where: { role: "user" } });
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser && existingUser.is_active == 1) {
      console.log("user active in controller", existingUser.is_active);
      return res.status(409).json({ message: "Email already registered" });
    }

    if (existingUser && existingUser.is_active == 0) {
      console.log("user active in controller", existingUser.is_active);
      await User.update({ 
        firstname,
        lastname,
        email,
        username,
        password: hashedPassword,
        is_active: false,
      },
    {
      where: { user_id: existingUser.user_id }
    })
      const otpResult = await requestOtp(email);
      return res.status(200).json({ message: otpResult.message });
    }

    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already registered" });
    }

    if (!defaultRole) {
      return res.status(500).json({ message: "Default role not found" });
    }

    await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
      role_id: defaultRole.role_id,
      is_active: false,
    });

    const otpResult = await requestOtp(email, true); // force ส่งใหม่
    return res.status(201).json({ message: otpResult.message });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password, username } = req.body;
  const { valid, errors } = validate.validateLogin(req.body);

  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const whereClause = email ? { email } : username ? { username } : null;
    const user = await User.findOne({ where: whereClause });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // เช็กการยืนยันอีเมล
    if (!user.is_active) {
      return res.status(403).json({ message: "Please verify your email before login." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message :"Invalid password"});

    const role = await Role.findByPk(user.role_id);

    const token = jwt.sign(
      { id: user.user_id, role: role.role, email: user.email }, // เพิ่ม email ใน token
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { id: user.user_id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 604800000 });
    res.status(200).json({ message: "Login successful", token, refreshToken });
  } catch (error) {
    console.log("Login Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  const { current_password, new_password, confirm_password } = req.body;
  const userId = req.user.id;

  const { valid, errors } = validate.validateChangePassword(req.body);
  if (!valid) return res.status(400).json({ message: "Validation failed", errors });

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.is_active) {
      return res.status(403).json({ message: "Please verify your email before changing password." });
    }

    const checkPassword = await bcrypt.compare(current_password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    
    const isSame = await bcrypt.compare(new_password, user.password);
    if (isSame) {
      return res.status(400).json({ message: "New password must be different" });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    const hashed = await bcrypt.hash(new_password, 10);
    await User.update({ password: hashed }, { where: { user_id: userId } });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change Password Error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// REFRESH TOKEN
const refreshToken = async (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.is_active) {
      return res.status(403).json({ message: "Please verify your email before getting a new token." });
    }

    const role = await Role.findByPk(user.role_id);
    const newAccessToken = jwt.sign(
      { id: user.user_id, role: role.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", newAccessToken, { httpOnly: true, maxAge: 86400000 });
    res.json({ message: "Token refreshed" });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// EDIT PROFILE
const changeProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email, firstname, lastname } = req.body;
  const { valid, errors } = validate.validateChangeProfile(req.body);
  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const currentUser = await User.findByPk(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!currentUser.is_active) {
      return res.status(403).json({ message: "Please verify your email before editing profile." });
    }

    // ตรวจสอบ username
    if (username && username !== currentUser.username) {
      const existingUser = await User.findOne({
        where: { username, user_id: { [Op.ne]: userId } },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken by another user." });
      }
    }

    const updateData = {};
    if (username && username !== currentUser.username) updateData.username = username;
    if (firstname && firstname !== currentUser.firstname) updateData.firstname = firstname;
    if (lastname && lastname !== currentUser.lastname) updateData.lastname = lastname;

    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({ message: "No changes detected." });
    }

    await User.update(updateData, { where: { user_id: userId } });
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password", "updatedAt", "createdAt"] },
    });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update Profile failed." });
  }
};

const changeEmail = async (req, res) => {
  const userId = req.user.id;
  const { email } = req.body;
  
  const { valid, errors } = validate.validateChangeEmail(req.body);
  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const currentUser = await User.findByPk(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!currentUser.is_active) {
      return res.status(403).json({ message: "Please verify your current email first." });
    }

    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail && existingEmail.user_id !== userId) {
      return res.status(400).json({ message: "Email already registered by another user." });
    }

    await User.update({ pending_email: email, is_active: false }, { where: { user_id: userId } });

    const otpResult = await requestOtp(email, true); // ส่ง OTP ไปอีเมลใหม่
    return res.status(200).json({ message: otpResult.message });
  } catch (error) {
    console.error("Change Email Error:", error);
    res.status(500).json({ message: "Change Email failed." });
  }
};


// DELETE ACCOUNT
const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;
  const { valid, errors } = validate.validateDeleteAccount(req.body);
  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "Please verify your email before deleting account." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    await User.destroy({ where: { user_id: userId } });
    res.clearCookie("token").clearCookie("refresh_token").status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete Account Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    const userId = req.user?.id;



    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ถ้าต้องให้ active ก่อนถึงจะ logout
    if (!user.is_active) {
      return res.status(403).json({ message: "Please verify your email before logout." });
    }

    res
      .clearCookie("token", { httpOnly: true })
      .clearCookie("refresh_token", { httpOnly: true })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["role_id", "password", "updatedAt", "createdAt", "pending_email", "is_active", "user_id"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user, "ok": true });
  } catch (err) {
    console.error("Get Me Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  register,
  login,
  changePassword,
  refreshToken,
  logout,
  changeProfile,
  deleteAccount,
  changeEmail,
  getMe
};

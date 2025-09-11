const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { User, Otp } = require("../models");

const otpRepo = require("../repositories/otpRepository");
const userRepo = require("../repositories/userRepository");

const validate = require("../validators/validateAuth");

const requestOtp = async (email, forceNew = false) => {
  if (!email) throw new Error("Email is required");

  // หา OTP ล่าสุดของอีเมลนี้
  const existingOtp = await Otp.findOne({
    where: { email },
    order: [["createdAt", "DESC"]],
  });

  // ถ้ามี OTP และยังไม่หมดอายุ และไม่ได้บังคับส่งใหม่
  if (existingOtp && existingOtp.expiresAt > new Date() && !forceNew) {
    return {
      status: "exists",
      message: "OTP already sent. Please check your email.",
    };
  }

  // ลบ OTP เก่า
  await Otp.destroy({ where: { email } });

  // สร้าง OTP ใหม่
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({ email, code, expiresAt });

  // ส่งอีเมล
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${code}. It will expire in 5 minutes.`,
  });

  return {
    status: "new",
    message: "OTP sent to email",
  };
};

// const verifyOtp = async (req, res) => {
//   const { email, otp_code } = req.body;
//   if (!email || !otp_code) {
//     return res.status(400).json({ message: "Email and OTP are required" });
//   }

//   try {
//     const otp = await Otp.findOne({ where: { email, code: otp_code } });
//     if (email !== otp.email) {
//       return res.status(400).json({ message: "Invalid email" });
//     }
//     if (!otp_code !== otp.code) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }
//     if (otp.expiresAt < new Date()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     await User.update({ is_active: true }, { where: { email } });
//     await Otp.destroy({ where: { id: otp.id } });

//     res.status(200).json({ message: "Account verified successfully" });
//   } catch (err) {
//     console.error("Verify OTP Error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// VERIFY EMAIL (Register only)
const verifyEmail = async (req, res) => {
  const { email, otp_code } = req.body;

  const { valid, errors } = validate.validateVerifyOtp(req.body);
  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  if (!email || !otp_code) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // ตรวจสอบว่ามีผู้ใช้ที่ email นี้ และยังไม่ active
    const user = await userRepo.findByEmail(email);
    if (!user || user.is_active) {
      return res.status(400).json({ message: "Invalid request for email verification" });
    }

    const otp = await otpRepo.findByEmailAndCode(email, otp_code);
    if (!otp) {
      return res.status(400).json({ message: "Invalid OTP or Email" });
    }

    if (otp.expiresAt < new Date()) {
      // ถ้า OTP หมดอายุ → ลบ user ไปเลย
      await userRepo.deleteUserByEmail(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    await userRepo.updateUser({ is_active: true }, { email });
    await otpRepo.deleteById(otp.id);

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verify Email Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// VERIFY CHANGE EMAIL (Change email only)
const verifyChangeEmail = async (req, res) => {
  const userId = req.user.id;
  const { otp_code } = req.body;

   const { valid, errors } = validate.validateVerifyOtp(req.body);
  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  if (!otp_code) {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const currentUser = await userRepo.findById(userId);
    if (!currentUser || !currentUser.pending_email) {
      return res.status(404).json({ message: "No pending email change found." });
    }

    const otp = await otpRepo.findByEmailAndCode(currentUser.pending_email, otp_code);
    if (!otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otp.expiresAt < new Date()) {
      // OTP หมดอายุ → ส่งใหม่
      await otpRepo.deleteByEmail(currentUser.pending_email);
      const otpResult = await requestOtp(currentUser.pending_email, true);
      return res.status(400).json({ message: `OTP expired. ${otpResult.message}` });
    }

    // อัปเดตอีเมลจริง
    await userRepo.updateUser(
      { email: currentUser.pending_email, pending_email: null, is_active: true },
      { user_id: userId }
    );

    await otpRepo.deleteById(otp.id);

    return res.status(200).json({ message: "Email changed and verified successfully." });
  } catch (error) {
    console.error("Verify Change Email Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





module.exports = { requestOtp, verifyEmail, verifyChangeEmail };


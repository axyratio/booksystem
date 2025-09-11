const express = require('express');
const router = express.Router();
const { login, getMe, register, changePassword, refreshToken, logout, changeProfile, deleteAccount, changeEmail } = require('../controllers/authController');
const { requestOtp, verifyEmail, verifyChangeEmail } = require("../service/otp")
const { authenticate, authorizeRole} = require("../middleware/auth")
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: 'Too many login attempts. Please try again later.'
});

router.post('/login', login);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.get('/me', authenticate, getMe);

router.post('/request-otp', requestOtp);

router.patch('/change-password', authenticate, changePassword);
router.patch('/change-email', authenticate, changeEmail);
router.post('/verify-change-email', authenticate, verifyChangeEmail);

router.patch("/change-password", authenticate, changePassword);
router.patch('/change-profile', authenticate, changeProfile);

router.post('/refresh', refreshToken);
router.post('/logout', authenticate, logout);
router.delete('/delete', authenticate, deleteAccount);

module.exports = router;

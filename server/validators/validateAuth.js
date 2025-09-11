const Joi = require("joi");

const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(50).required(),
  lastname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(), // Gmail-compliant
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().optional(),
  username: Joi.string().alphanum().min(4).optional(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .required()
    
}).xor("email", "username");

const changePasswordSchema = Joi.object({
  current_password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .required(),
  new_password: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  ).required(),
  confirm_password: Joi.string().valid(Joi.ref('new_password')).required()
    .messages({
      "any.only": "New password and confirm password must match",
      "string.empty": "Confirm password is required",
    }),
});

const changeProfile = Joi.object({
  firstname: Joi.string().min(3).max(50).optional(),
  lastname: Joi.string().min(3).max(50).optional(),
  username: Joi.string().alphanum().min(4).max(30).optional(),
}).min(1); // ต้องมีอย่างน้อย 1 ฟิลด์

const deleteAccountSchema = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .required()
    
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp_code: Joi.string().length(6).required(),
}).messages({
  "string.email": "New email must be a valid email address",
  "string.length": "OTP code must be exactly 6 characters long",
});

const changeEmailSchema = Joi.object({
  email: Joi.string().email().required(),
}).messages({
  "string.email": "New email must be a valid email address",
});

const validatePasswordDetail = (password) => {
  const errors = [];

  if (!/[A-Z]/.test(password))
    errors.push("must include at least one uppercase letter (A-Z)");
  if (!/[a-z]/.test(password))
    errors.push("must include at least one lowercase letter (a-z)");
  if (!/[0-9]/.test(password))
    errors.push("must include at least one number (0-9)");
  if (!/[\W_]/.test(password))
    errors.push("must include at least one special character (!@#$...)");
  if (password.length < 8) errors.push("must be at least 8 characters long");

  return errors;
};

const validateInput = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });

  const allErrors = [];

  if (error) {
    allErrors.push(...error.details.map((e) => e.message));
  }

  // ✅ ตรวจ password หากมีฟิลด์ password
  if (data.password) {
    const pwdErrors = validatePasswordDetail(data.password);
    allErrors.push(...pwdErrors);
  }

  // ✅ ตรวจ new_password หากมีฟิลด์นี้ (เช่น forgotPassword)
  if (data.new_password) {
    const newPwdErrors = validatePasswordDetail(data.new_password);
    allErrors.push(...newPwdErrors);
  }
  console.log(allErrors.slice(1))
  if (allErrors.length > 0) {
    return {
      valid: false,
      errors: allErrors.slice(1),
    };
  }

  return {
    valid: true,
    errors: [],
  };
};

module.exports = {
  validateRegister: (data) => validateInput(registerSchema, data),
  validateLogin: (data) => validateInput(loginSchema, data),
  validateChangePassword: (data) => validateInput(changePasswordSchema, data),
  validateChangeProfile: (data) => validateInput(changeProfile, data),
  validateDeleteAccount: (data) => validateInput(deleteAccountSchema, data),
  validatePasswordDetail,
  validateVerifyOtp: (data) => validateInput(verifyOtpSchema, data),
  validateChangeEmail: (data) => validateInput(changeEmailSchema, data),
};

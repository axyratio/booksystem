const { Otp } = require("../models");

const findByEmailAndCode = async (email, code) => {
  return await Otp.findOne({ where: { email, code } });
};

const deleteById = async (id) => {
  return await Otp.destroy({ where: { id } });
};

const deleteByEmail = async (email) => {
  return await Otp.destroy({ where: { email } });
};

module.exports = {
  findByEmailAndCode,
  deleteById,
  deleteByEmail
};

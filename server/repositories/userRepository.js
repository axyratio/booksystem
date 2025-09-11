const { User } = require("../models");
const { Op } = require("sequelize");

const findByEmailOrUsername = async (email, username) => {
  return await User.findOne({
    where: { [Op.or]: [{ email }, { username }] }
  });
};

const findById = async (id) => {
  return await User.findByPk(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const createUser = async (data) => {
  return await User.create(data);
};

const updateUser = async (data, condition) => {
  return await User.update(data, { where: condition });
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { user_id: id } });
};

const deleteUserByEmail = async (email) => {
  return await User.destroy({ where: { email } });
};

const checkDuplicateUsername = async (username, excludeId) => {
  return await User.findOne({
    where: {
      username,
      user_id: { [Op.ne]: excludeId }
    }
  });
};

const checkDuplicateEmail = async (email, excludeId) => {
  return await User.findOne({
    where: {
      email,
      user_id: { [Op.ne]: excludeId }
    }
  });
};


module.exports = {
  findByEmailOrUsername,
  findById,
  findByEmail,
  createUser,
  updateUser,
  deleteUser,
  checkDuplicateUsername,
  checkDuplicateEmail,
  deleteUserByEmail
};

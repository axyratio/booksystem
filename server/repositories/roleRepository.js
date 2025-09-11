const { Role } = require("../models");

const findByRoleName = async (roleName) => {
  return await Role.findOne({ where: { role: roleName } });
};

const findById = async (id) => {
  return await Role.findByPk(id);
};

module.exports = {
  findByRoleName,
  findById
};

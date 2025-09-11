const bcrypt = require("bcryptjs");

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ ให้ Sequelize สร้างอัตโนมัติ
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // ✅ กำหนดค่าเริ่มต้นเป็น true
    },
    pending_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "role_id" });
    User.hasMany(models.Booking, { foreignKey: "user_id" });
    User.hasMany(models.Review, { foreignKey: "user_id" });
  };

  return User;
};

module.exports = User; // ✅ ต้องใช้แบบนี้

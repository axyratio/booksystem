module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define("Publisher", {
    pub_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      pub_name: DataTypes.STRING,
  });

  Publisher.associate = models => {
    Publisher.belongsToMany(models.Book, {
      through: "BookPublisher",
      foreignKey: "pub_id",
      as: "books"
    });
  };

  return Publisher;
};

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("Author", {
    author_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING
  });

  Author.associate = models => {
    Author.belongsToMany(models.Book, {
      through: "BookAuthor",
      foreignKey: "author_id",
      as: "books"
    });
  };

  
  return Author;
};

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    book_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    type: DataTypes.STRING, //ebook, book
    category: DataTypes.STRING, //("fiction", "nonfiction", "science", "history"),
    amount: DataTypes.INTEGER,
    published_date: DataTypes.DATE,
    description: DataTypes.TEXT,
    cover_image: DataTypes.STRING
  });

  Book.associate = models => {
    Book.belongsToMany(models.Publisher, {
      through: "BookPublisher",
      foreignKey: "book_id",
      as: "publishers"
    });
    Book.belongsToMany(models.Author, {
      through: "BookAuthor",
      foreignKey: "book_id",
      as: "authors"
    });
    Book.hasMany(models.Booking, { foreignKey: "book_id" });
    Book.hasMany(models.Review, { foreignKey: "book_id" });
  };

  return Book;
};

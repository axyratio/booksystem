module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define("BookAuthor", {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    tableName: 'bookauthors',
    timestamps: false
  });
  return BookAuthor;
};

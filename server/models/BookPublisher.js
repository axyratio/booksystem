module.exports = (sequelize, DataTypes) => {
  const BookPublisher = sequelize.define("BookPublisher", {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    pub_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'bookpublishers',
    timestamps: false
  });

  return BookPublisher;
};

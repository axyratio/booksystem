module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    star: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false
    },
    comment: DataTypes.STRING
  });

  Review.associate = models => {
    Review.belongsTo(models.User, { foreignKey: "user_id" });
    Review.belongsTo(models.Book, { foreignKey: "book_id" });
  };

  // Prevent duplicate review per user/book
  Review.addHook("beforeValidate", async (review, options) => {
    const exists = await Review.findOne({
      where: {
        user_id: review.user_id,
        book_id: review.book_id
      }
    });
    if (exists) {
      throw new Error("User already reviewed this book.");
    }
  });

  return Review;
};

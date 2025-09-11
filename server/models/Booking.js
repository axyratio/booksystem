module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    booking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    book_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  });

  Booking.associate = models => {
    Booking.belongsTo(models.User, { foreignKey: "user_id" });
    Booking.belongsTo(models.Book, { foreignKey: "book_id" });
  };

  return Booking;
};

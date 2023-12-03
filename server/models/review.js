module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookingId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    message: { 
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reviewDate: { 
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    tableName: 'reviews',
    timestamps: true,
  });

  Review.associate = function (models) {
    Review.belongsTo(models.Booking, { foreignKey: 'bookingId' }); 
    Review.belongsTo(models.User, { foreignKey: 'userId' }); 
  };

  return Review;
};

module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      ReviewID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      BookingID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      ReviewDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      tableName: 'reviews',
      timestamps: true
    });
  
    Review.associate = function(models) {
      Review.belongsTo(models.Booking, { foreignKey: 'BookingID' });
      Review.belongsTo(models.User, { foreignKey: 'UserID' });
    };
    
    return Review;
  };
  
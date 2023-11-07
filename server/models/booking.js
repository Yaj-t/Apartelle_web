module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      BookingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      RoomID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      HeadCount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      DateStart: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      DateEnd: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    }, {
      tableName: 'booking',
      timestamps: true
    });

    Booking.associate = function(models) {
      Booking.belongsTo(models.User, { foreignKey: 'UserID' });
      Booking.belongsTo(models.Room, { foreignKey: 'RoomID' });
      Booking.hasMany(models.Review, { foreignKey: 'BookingID' });
    };
  
    return Booking;
  };
  
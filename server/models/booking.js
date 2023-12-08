module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    bookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    dateStart: { 
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateEnd: { 
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: { 
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: 'booking',
    timestamps: true,
  });

  Booking.associate = function (models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' }); 
    Booking.belongsTo(models.Room, { foreignKey: 'roomId', onDelete: 'CASCADE' }); 
    Booking.hasOne(models.Review, { foreignKey: 'bookingId' });

  };

  return Booking;
};

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    tableName: 'rooms',
    timestamps: true,
  });

  Room.associate = function (models) {
    Room.belongsTo(models.RoomType, { foreignKey: 'roomTypeId' }); 
    Room.hasMany(models.Booking, { foreignKey: 'roomId', onDelete: 'CASCADE' }); 
  };

  return Room;
};

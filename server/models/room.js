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
      isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      roomNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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

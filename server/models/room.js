module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      RoomID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      RoomTypeID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      RoomNumber: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    }, {
      tableName: 'rooms',
      timestamps: true
    });

    Room.associate = function(models) {
      Room.belongsTo(models.RoomType, { foreignKey: 'RoomTypeID' });
      Room.hasMany(models.Booking, { foreignKey: 'RoomID', onDelete: 'CASCADE'});
    };
  
    return Room;
  };
  
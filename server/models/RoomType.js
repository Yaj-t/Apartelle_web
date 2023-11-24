module.exports = (sequelize, DataTypes) => {
    const RoomType = sequelize.define('RoomType', {
      roomTypeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      typeName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      typeDescription: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bedCount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'roomtypes',
      timestamps: true
    });

    RoomType.associate = function(models) {
      RoomType.hasMany(models.Room, { foreignKey: 'RoomTypeID', onDelete: 'CASCADE' });
    };
  
    return RoomType;
  };
  
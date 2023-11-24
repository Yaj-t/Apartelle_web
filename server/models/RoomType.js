module.exports = (sequelize, DataTypes) => {
    const RoomType = sequelize.define('RoomType', {
      RoomTypeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      TypeName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      TypeDescription: {
        type: DataTypes.TEXT
      },
      TypeQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      MaxPersons: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      BedCount: {
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
  
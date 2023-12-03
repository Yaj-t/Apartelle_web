module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define('RoomType', {
    roomTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    typeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    typeDescription: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'roomTypes',
    timestamps: true,
  });

  RoomType.associate = function (models) {
    RoomType.hasMany(models.Room, { foreignKey: 'roomTypeId', onDelete: 'CASCADE' });
  };

  return RoomType;
};

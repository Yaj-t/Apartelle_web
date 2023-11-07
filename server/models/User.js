module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_type: {
        type: DataTypes.ENUM('ADMIN', 'Employee', 'User'),
        defaultValue: 'User'
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      contact_number: {
        type: DataTypes.STRING(20)
      }
    }, {
      tableName: 'users',
      timestamps: true
    });

    User.associate = function(models) {
        User.hasMany(models.Booking, { foreignKey: 'UserID' });
        User.hasMany(models.Review, { foreignKey: 'UserID' });
      };
  
    return User;
  };
  
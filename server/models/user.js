module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email address format'
        },
      }
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    salt: DataTypes.STRING
  });

  User.associate = (models) => {
    User.hasMany(models.Message, {
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Group, {
      foreignKey: 'userId',
      through: 'UserGroups',
    });
  };
  return User;
};

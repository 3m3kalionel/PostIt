module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Message, {
          foreignKey: 'userId',
          as: 'userMessages'
        });
        User.belongsToMany(models.Group, {
          as: 'Members',
          foreignKey: 'groupId',
          through: 'UserGroup',
        });
      }
    }
  });
  return User;
};

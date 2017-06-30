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
    },
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        User.hasMmany(models.Message, {
          foreignKey: 'userId',
          as: 'userMessages'
        });
      }
    }
  });
  return User;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Message, {
          foreignKey: 'userId',
          as: 'userMessages',
        });
      },
    },
  });
  return User;
};

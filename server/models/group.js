module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
          as: 'groupMesages',
        });
        Group.belongsToMany(models.User, {
          as: 'Groups',
          foreignKey: 'userId',
          through: 'UserGroup',
        });
      },
    },
  });
  return Group;
};

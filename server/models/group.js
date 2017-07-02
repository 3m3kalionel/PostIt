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
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message, {
      foreignKey: 'GroupId',
      as: 'groupMesages',
    });
    Group.belongsToMany(models.User, {
      as: 'Groups',
      foreignKey: 'UserId',
      through: 'UserGroup',
    });
  };
  return Group;
};

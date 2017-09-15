module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId',
    });
    Group.belongsToMany(models.User, {
      foreignKey: 'groupId',
      through: 'UserGroups',
    });
  };
  return Group;
};
